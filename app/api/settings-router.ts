import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { findSettings, updateSettings, createDefaultSettings } from "./queries/settings";

export const settingsRouter = createRouter({
  get: publicQuery.query(async () => {
    let settings = await findSettings();
    if (!settings) {
      settings = await createDefaultSettings();
    }
    return settings;
  }),

  update: adminQuery
    .input(
      z.object({
        studioName: z.string().optional(),
        tagline: z.string().optional(),
        logoUrl: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        facebookUrl: z.string().optional(),
        instagramUrl: z.string().optional(),
        twitterUrl: z.string().optional(),
        youtubeUrl: z.string().optional(),
        primaryColor: z.string().optional(),
        secondaryColor: z.string().optional(),
        accentColor: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await updateSettings(input);
      return { success: true };
    }),
});
