import {
  createClient,
  FunctionInvokeOptions,
  SupabaseClient,
  SupabaseClientOptions,
} from "supabase-js";

import {
  Database,
  EdgeFunctionOptionsType,
  EdgeFunctionReturnType,
  EdgeFunctionsEnum,
} from "@libs/schemas";
import { deleteRecord } from "@/data/common.ts";

const supabaseUrl = Deno.env.get("SB_URL") ?? "";
const supabaseKey = Deno.env.get("SB_PUBLISHABLE_KEY") ?? "";
const supabaseSecretKey = Deno.env.get("SB_SECRET_KEY") ?? "";

export const createTestClient = (
  options: SupabaseClientOptions<"public"> = {},
) =>
  createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    ...options,
  });

export const createPrivilegedTestClient = () => {
  return createClient<Database>(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
};

export const createAuthenticatedTestClient = async (email?: string) => {
  const testEmail = email ?? "test.user@mindsea.com";
  const testPassword = "password123";

  // Try to sign in first
  const { data, error } = await createTestClient().auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });

  const accessToken = data?.session?.access_token;
  const user = data?.user;

  if (!accessToken || !user) {
    console.error("Auth failed. Data:", data, "Error:", error);
    throw new Error("Could not authenticate test user");
  }

  const client = createTestClient({
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  return { client, user };
};

export const invokeEdgeFunction = async <T extends EdgeFunctionsEnum>({
  client,
  func,
  opts,
  method = "POST",
}: {
  client: SupabaseClient;
  func: T;
  opts?: EdgeFunctionOptionsType[T];
  method?: FunctionInvokeOptions["method"];
}) => {
  const result = await client.functions.invoke<EdgeFunctionReturnType[T]>(
    func,
    { ...(opts ?? {}), method },
  );

  if (result.error) {
    // To get full error message, we need to parse the error response
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const error = await result.error.context.json();

    return { ...result, error: error as object };
  }

  return result;
};

export const cleanUpResources = ({
  client,
  resources,
}: {
  client: SupabaseClient;
  resources: {
    table: keyof Database["public"]["Tables"];
    id?: string;
    compositeKey?: {
      keyOne: string;
      valueOne: string;
      keyTwo: string;
      valueTwo: string;
    };
  }[];
}) => {
  return Promise.all(
    resources.map(resource =>
      deleteRecord({ supabaseClient: client, ...resource }),
    ),
  );
};
