import { Database } from "@libs/schemas";
import { SupabaseClientType } from "@/data/types.ts";

export const deleteRecord = ({
  supabaseClient,
  table,
  id,
  compositeKey,
}: {
  supabaseClient: SupabaseClientType;
  table: keyof Database["public"]["Tables"];
  id?: string;
  compositeKey?: {
    keyOne: string;
    valueOne: string;
    keyTwo: string;
    valueTwo: string;
  };
}) => {
  const query = supabaseClient.from(table).delete();

  if (id) {
    return query.eq("id", id);
  } else if (compositeKey) {
    return query
      .eq(compositeKey.keyOne, compositeKey.valueOne)
      .eq(compositeKey.keyTwo, compositeKey.valueTwo);
  }
};
