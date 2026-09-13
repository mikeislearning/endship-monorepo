import { z } from "zod";

export const authSearchParamsSchema = z.object({
  redirect: z
    .string()
    .optional()
    .transform(v => {
      if (!v) return undefined;
      if (v.includes("http")) {
        try {
          const url = new URL(v);
          return v.replace(`${url.protocol}//${url.host}`, "");
        } catch {
          return undefined;
        }
      }
      return v;
    })
    .catch(undefined),
});

export type AuthSearchParamsType = z.infer<typeof authSearchParamsSchema>;
