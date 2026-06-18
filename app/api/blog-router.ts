import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllBlogPosts,
  findPublishedBlogPosts,
  findBlogPostBySlug,
  findBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "./queries/blogPosts";

export const blogRouter = createRouter({
  list: publicQuery.query(async () => {
    return findPublishedBlogPosts();
  }),

  listAll: adminQuery.query(async () => {
    return findAllBlogPosts();
  }),

  bySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return findBlogPostBySlug(input.slug);
    }),

  byId: adminQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return findBlogPostById(input.id);
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        slug: z.string().min(1, "Slug is required"),
        excerpt: z.string().optional(),
        content: z.string().min(1, "Content is required"),
        coverImage: z.string().optional(),
        author: z.string().optional(),
        published: z.enum(["draft", "published"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const id = await createBlogPost(input);
      return { success: true, id };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        coverImage: z.string().optional(),
        author: z.string().optional(),
        published: z.enum(["draft", "published"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateBlogPost(id, data);
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteBlogPost(input.id);
      return { success: true };
    }),
});
