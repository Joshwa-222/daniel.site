import { eq, desc } from "drizzle-orm";
import * as schema from "@db/schema";
import { getDb } from "./connection";

export async function findAllMessages() {
  return getDb()
    .select()
    .from(schema.messages)
    .orderBy(desc(schema.messages.createdAt));
}

export async function findMessageById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.messages)
    .where(eq(schema.messages.id, id))
    .limit(1);
  return rows.at(0);
}

export async function createMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  content: string;
}) {
  const result = await getDb()
    .insert(schema.messages)
    .values(data)
    .$returningId();
  return result[0]?.id;
}

export async function updateMessageReadStatus(id: number, isRead: "unread" | "read") {
  await getDb()
    .update(schema.messages)
    .set({ isRead })
    .where(eq(schema.messages.id, id));
}

export async function updateMessageReplyStatus(id: number, replyStatus: "no_reply" | "replied") {
  await getDb()
    .update(schema.messages)
    .set({ replyStatus })
    .where(eq(schema.messages.id, id));
}

export async function deleteMessage(id: number) {
  await getDb()
    .delete(schema.messages)
    .where(eq(schema.messages.id, id));
}
