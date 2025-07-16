import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  // Fetch all public events
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({
      where: { isPublic: true },
      orderBy: { date: "asc" },
    });
  }),

  // Create a new event
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      date: z.string(), // from <input type="datetime-local">
      location: z.string().min(1),
      tags: z.array(z.string()).optional(),
      isPublic: z.boolean().optional(),
      status: z.enum(["PLANNED", "CANCELLED", "COMPLETED"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.create({
        data: {
          title: input.title,
          description: input.description || "",
          date: new Date(input.date),
          location: input.location,
          tags: input.tags || [],
          isPublic: input.isPublic ?? true,
          status: input.status ?? "PLANNED",
          organizerId: ctx.session.user.id,
        },
      });
    }),
});
