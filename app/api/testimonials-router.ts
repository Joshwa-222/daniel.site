import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "./queries/testimonials";

export const testimonialsRouter = createRouter({
  list: publicQuery.query(async () => {
    return findAllTestimonials();
  }),

  create: adminQuery
    .input(
      z.object({
        clientName: z.string().min(1, "Client name is required"),
        clientTitle: z.string().optional(),
        content: z.string().min(1, "Content is required"),
        rating: z.number().min(1).max(5).optional(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const id = await createTestimonial(input);
      return { success: true, id };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        clientName: z.string().optional(),
        clientTitle: z.string().optional(),
        content: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateTestimonial(id, data);
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteTestimonial(input.id);
      return { success: true };
    }),
});
