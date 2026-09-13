# Check if the correct number of arguments are provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <environment>"
  exit 1
fi

# Get the environment from the arguments
environment=$1

# Construct the file and field names
# The .env file is in the root of the monorepo, so go up two levels from apps/native/scripts/
file="../../.env.$environment"
field1="build"
field2="$environment"
field3="env"

# Check if the environment file exists
if [ ! -f "$file" ]; then
  echo "Warning: $file does not exist. Skipping environment variable injection."
  exit 0
fi

# Source the .env file to load all variables into the shell environment
# This allows us to resolve variable references like $BASE_SUPABASE_URL
# We need to export them so they're available for substitution
set -a  # automatically export all variables
source "$file" 2>/dev/null || true
set +a  # disable automatic export

# Create a temporary file
temp_file=$(mktemp)

# Extract the variables from the provided file and write them to the temporary file
grep -v '^#' "$file" | grep -v '^$' > "$temp_file"

# Check if temp_file has any content
if [ ! -s "$temp_file" ]; then
  echo "Warning: $file exists but contains no variables. Skipping injection."
  rm "$temp_file"
  exit 0
fi

# Loop over the lines in the temporary file
while IFS='=' read -r key value; do
  # Skip if key is empty or does not start with EXPO_PUBLIC_
  if [ -z "$key" ] || [[ ! "$key" =~ ^EXPO_PUBLIC_ ]]; then
    continue
  fi
  
  # Remove leading and trailing double quotes from the value
  value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')
  
  # Resolve variable references (e.g., $BASE_SUPABASE_URL -> actual value)
  # Use envsubst if available, otherwise use eval with proper escaping
  if command -v envsubst >/dev/null 2>&1; then
    # envsubst is safer and more reliable
    resolved_value=$(echo "$value" | envsubst)
  else
    # Fallback: use eval with proper escaping (less safe but works)
    # Only evaluate if the value contains a $ sign
    if [[ "$value" == *\$* ]]; then
      resolved_value=$(eval echo "$value")
    else
      resolved_value="$value"
    fi
  fi
  
  # Debug: Show what we're injecting (optional, remove in production)
  if [[ "$resolved_value" == *\$* ]]; then
    echo "Warning: Variable $key still contains unresolved references: $resolved_value"
  fi
  
  # Inject the resolved environment variable into the JSON file
  jq --arg key "$key" --arg value "$resolved_value" --arg field1 "$field1" --arg field2 "$field2" --arg field3 "$field3" \
    '. as $json | $json * { ($field1): { ($field2): { ($field3): { ($key): $value } } } }' ./eas.json > temp.json && mv temp.json ./eas.json
done < "$temp_file"

# Clean up temporary file
rm "$temp_file"

# Debug: Show what was injected (optional)
echo "✅ Injected variables for $environment:"
jq ".build.$environment.env" ./eas.json