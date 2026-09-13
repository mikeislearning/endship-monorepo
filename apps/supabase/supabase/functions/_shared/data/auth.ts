import { HTTPStatusCode } from "@libs/schemas";
import { SupabaseClientType } from "@/data/types.ts";
import { EdgeFunctionError } from "@/utils/errors.ts";

export const getAuthUser = async (supabaseClient: SupabaseClientType) => {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error) {
    throw new EdgeFunctionError({
      statusCode: HTTPStatusCode.UNAUTHORIZED,
      message: "Unauthenticated",
    });
  }

  return data.user;
};
