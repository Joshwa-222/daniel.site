import { eq, desc } from "drizzle-orm";
import * as schema from "@db/schema";
import { getDb } from "./connection";

export async function findAllBlogPosts() {
  return getDb()
    .select()
    .from(schema.blogPosts)
    .orderBy(desc(schema.blogPosts.createdAt));
}

export async function findPublishedBlogPosts() {
  return getDb()
    .select()
    .from(schema.blogPosts)
    .where(eq(schema.blogPosts.published, "published"))
    .orderBy(desc(schema.blogPosts.createdAt));
}

export async function findBlogPostBySlug(slug: string) {
  const rows = await getDb()
    .select()
    .from(schema.blogPosts)
    .where(eq(schema.blogPosts.slug, slug))
    .limit(1);
  return rows.at(0);
}

export async function findBlogPostById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.blogPosts)
    .where(eq(schema.blogPosts.id, id))
    .limit(1);
  return rows.at(0);
}

export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  author?: string;
  published?: "draft" | "published";
}) {
  const result = await getDb()
    .insert(schema.blogPosts)
    .values(data)
    .$returningId();
  return result[0]?.id;
}

export async function updateBlogPost(id: number, data: Partial<typeof schema.blogPosts.$inferInsert>) {
  await getDb()
    .update(schema.blogPosts)
    .set(data)
    .where(eq(schema.blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  await getDb()
    .delete(schema.blogPosts)
    .where(eq(schema.blogPosts.id, id));
}
