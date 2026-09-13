import { createClient } from "@supabase/supabase-js";

import {
  Database,
  EdgeFunctionOptionsType,
  EdgeFunctionReturnType,
  EdgeFunctionsEnum,
} from "@libs/schemas";
import { envVariables } from "@/utils/envVariables";

export const supabaseClient = createClient<Database>(
  envVariables.EXPO_PUBLIC_SUPABASE_URL,
  envVariables.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

export const invokeEdgeFunction = async <T extends EdgeFunctionsEnum>({
  func,
  opts,
}: {
  func: T;
  opts?: EdgeFunctionOptionsType[T];
}) => {
  const result = await supabaseClient.functions.invoke<
    EdgeFunctionReturnType[T]
  >(func, opts);

  if (result.error) {
    // To get full error message, we need to parse the error response
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const error = await result.error.context.json();

    return { ...result, error: error as object };
  }

  return result;
};
