import { eq, desc } from "drizzle-orm";
import * as schema from "@db/schema";
import { getDb } from "./connection";

export async function findAllPortfolio() {
  return getDb()
    .select()
    .from(schema.portfolio)
    .orderBy(desc(schema.portfolio.createdAt));
}

export async function findPortfolioByCategory(category: string) {
  return getDb()
    .select()
    .from(schema.portfolio)
    .where(eq(schema.portfolio.category, category))
    .orderBy(desc(schema.portfolio.createdAt));
}

export async function findPortfolioById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.portfolio)
    .where(eq(schema.portfolio.id, id))
    .limit(1);
  return rows.at(0);
}

export async function findFeaturedPortfolio() {
  return getDb()
    .select()
    .from(schema.portfolio)
    .where(eq(schema.portfolio.featured, "yes"))
    .orderBy(desc(schema.portfolio.createdAt));
}

export async function createPortfolio(data: {
  title: string;
  category: string;
  description?: string;
  imageUrl: string;
  featured?: "yes" | "no";
}) {
  const result = await getDb()
    .insert(schema.portfolio)
    .values(data)
    .$returningId();
  return result[0]?.id;
}

export async function updatePortfolio(id: number, data: Partial<typeof schema.portfolio.$inferInsert>) {
  await getDb()
    .update(schema.portfolio)
    .set(data)
    .where(eq(schema.portfolio.id, id));
}

export async function deletePortfolio(id: number) {
  await getDb()
    .delete(schema.portfolio)
    .where(eq(schema.portfolio.id, id));
}
