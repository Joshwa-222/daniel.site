import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from "./queries/bookings";

export const bookingsRouter = createRouter({
  list: adminQuery.query(async () => {
    return findAllBookings();
  }),

  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        serviceType: z.string().min(1, "Service type is required"),
        eventDate: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const id = await createBooking(input);
      return { success: true, id };
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "approved", "rejected"]),
      })
    )
    .mutation(async ({ input }) => {
      await updateBookingStatus(input.id, input.status);
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteBooking(input.id);
      return { success: true };
    }),
});
