
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const caseRouter = createTRPCRouter({
  expressInterest: protectedProcedure
    .input(z.object({ caseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const lawyer = await ctx.db.lawyerProfile.findUnique({
        where: { userId: ctx.session.user.id },
      });

      if (!lawyer) {
        throw new Error("Lawyer profile not found.");
      }

      return ctx.db.caseInterest.create({
        data: {
          caseId: input.caseId,
          lawyerId: lawyer.id,
        },
      });
    }),

  getInterestedLawyers: protectedProcedure
    .input(z.object({ caseId: z.string() }))
    .query(async ({ ctx, input }) => {
      const interests = await ctx.db.caseInterest.findMany({
        where: { caseId: input.caseId },
        include: { lawyer: true },
      });

      return interests.map((interest) => interest.lawyer);
    }),
});
