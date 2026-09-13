#!/bin/bash
echo "Removing Vault Secrets from supabase config.toml"

# Remove [db.vault] section entirely from config.toml before deployment
# Required to prevent local vault values from overwriting deployed secrets
# See https://github.com/supabase/cli/issues/3815
awk '
  /^\[db\.vault\]/ {flag=1; next}
  flag && /^\[/ {flag=0}
  !flag {print}
' apps/supabase/supabase/config.toml > temp && mv temp apps/supabase/supabase/config.toml


echo "Vault Secrets removed from supabase config.toml"


