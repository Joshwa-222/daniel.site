import * as schema from "@db/schema";
import { getDb } from "./connection";

export async function findSettings() {
  const rows = await getDb()
    .select()
    .from(schema.settings)
    .limit(1);
  return rows.at(0);
}

export async function createDefaultSettings() {
  await getDb()
    .insert(schema.settings)
    .values({})
    .$returningId();
  return findSettings();
}

export async function updateSettings(data: Partial<typeof schema.settings.$inferInsert>) {
  const existing = await findSettings();
  if (!existing) {
    await createDefaultSettings();
  }
  await getDb()
    .update(schema.settings)
    .set(data);
}
