import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import {
  bookings,
  messages,
  portfolio,
  testimonials,
  blogPosts,
  users,
} from "@db/schema";
import { count } from "drizzle-orm";

export const adminRouter = createRouter({
  stats: adminQuery.query(async () => {
    const db = getDb();

    const [bookingsCount] = await db
      .select({ value: count() })
      .from(bookings);
    const [messagesCount] = await db
      .select({ value: count() })
      .from(messages);
    const [portfolioCount] = await db
      .select({ value: count() })
      .from(portfolio);
    const [testimonialsCount] = await db
      .select({ value: count() })
      .from(testimonials);
    const [blogPostsCount] = await db
      .select({ value: count() })
      .from(blogPosts);
    const [usersCount] = await db
      .select({ value: count() })
      .from(users);

    return {
      totalBookings: bookingsCount.value,
      totalMessages: messagesCount.value,
      totalPortfolio: portfolioCount.value,
      totalTestimonials: testimonialsCount.value,
      totalBlogPosts: blogPostsCount.value,
      totalUsers: usersCount.value,
    };
  }),

  users: adminQuery.query(async () => {
    return getDb().query.users.findMany();
  }),
});
