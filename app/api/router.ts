import { authRouter } from "./auth-router";
import { bookingsRouter } from "./bookings-router";
import { messagesRouter } from "./messages-router";
import { portfolioRouter } from "./portfolio-router";
import { testimonialsRouter } from "./testimonials-router";
import { blogRouter } from "./blog-router";
import { settingsRouter } from "./settings-router";
import { adminRouter } from "./admin-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  bookings: bookingsRouter,
  messages: messagesRouter,
  portfolio: portfolioRouter,
  testimonials: testimonialsRouter,
  blog: blogRouter,
  settings: settingsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
