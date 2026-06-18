import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllMessages,
  createMessage,
  updateMessageReadStatus,
  updateMessageReplyStatus,
  deleteMessage,
} from "./queries/messages";

export const messagesRouter = createRouter({
  list: adminQuery.query(async () => {
    return findAllMessages();
  }),

  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        subject: z.string().optional(),
        content: z.string().min(1, "Message content is required"),
      })
    )
    .mutation(async ({ input }) => {
      const id = await createMessage(input);
      return { success: true, id };
    }),

  markRead: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await updateMessageReadStatus(input.id, "read");
      return { success: true };
    }),

  markReplied: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await updateMessageReplyStatus(input.id, "replied");
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteMessage(input.id);
      return { success: true };
    }),
});
