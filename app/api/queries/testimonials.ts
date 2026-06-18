import { eq, desc } from "drizzle-orm";
import * as schema from "@db/schema";
import { getDb } from "./connection";

export async function findAllTestimonials() {
  return getDb()
    .select()
    .from(schema.testimonials)
    .orderBy(desc(schema.testimonials.createdAt));
}

export async function findTestimonialById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.testimonials)
    .where(eq(schema.testimonials.id, id))
    .limit(1);
  return rows.at(0);
}

export async function createTestimonial(data: {
  clientName: string;
  clientTitle?: string;
  content: string;
  rating?: number;
  imageUrl?: string;
}) {
  const result = await getDb()
    .insert(schema.testimonials)
    .values(data)
    .$returningId();
  return result[0]?.id;
}

export async function updateTestimonial(id: number, data: Partial<typeof schema.testimonials.$inferInsert>) {
  await getDb()
    .update(schema.testimonials)
    .set(data)
    .where(eq(schema.testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  await getDb()
    .delete(schema.testimonials)
    .where(eq(schema.testimonials.id, id));
}
