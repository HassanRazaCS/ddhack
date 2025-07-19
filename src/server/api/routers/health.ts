import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const healthRouter = createTRPCRouter({
  check: publicProcedure
    .query(() => {
      return {
        status: "ok",
        timestamp: new Date().toISOString(),
        message: "Legal Aid Connect API is running",
      };
    }),
});