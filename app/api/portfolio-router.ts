import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllPortfolio,
  findPortfolioByCategory,
  findFeaturedPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "./queries/portfolio";

export const portfolioRouter = createRouter({
  list: publicQuery.query(async () => {
    return findAllPortfolio();
  }),

  listByCategory: publicQuery
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      return findPortfolioByCategory(input.category);
    }),

  featured: publicQuery.query(async () => {
    return findFeaturedPortfolio();
  }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        category: z.string().min(1, "Category is required"),
        description: z.string().optional(),
        imageUrl: z.string().min(1, "Image URL is required"),
        featured: z.enum(["yes", "no"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const id = await createPortfolio(input);
      return { success: true, id };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        category: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        featured: z.enum(["yes", "no"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updatePortfolio(id, data);
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deletePortfolio(input.id);
      return { success: true };
    }),
});
