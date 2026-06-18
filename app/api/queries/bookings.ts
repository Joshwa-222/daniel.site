import { eq, desc } from "drizzle-orm";
import * as schema from "@db/schema";
import { getDb } from "./connection";

export async function findAllBookings() {
  return getDb()
    .select()
    .from(schema.bookings)
    .orderBy(desc(schema.bookings.createdAt));
}

export async function findBookingById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.bookings)
    .where(eq(schema.bookings.id, id))
    .limit(1);
  return rows.at(0);
}

export async function createBooking(data: {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  eventDate?: string;
  message?: string;
}) {
  const result = await getDb()
    .insert(schema.bookings)
    .values(data)
    .$returningId();
  return result[0]?.id;
}

export async function updateBookingStatus(id: number, status: "pending" | "approved" | "rejected") {
  await getDb()
    .update(schema.bookings)
    .set({ status })
    .where(eq(schema.bookings.id, id));
}

export async function deleteBooking(id: number) {
  await getDb()
    .delete(schema.bookings)
    .where(eq(schema.bookings.id, id));
}
