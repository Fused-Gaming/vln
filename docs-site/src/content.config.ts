import { defineCollection, z } from 'astro:content';

// Define docs collection with permissive Zod schema
// Allows any frontmatter fields to avoid Zod validation errors during static generation
const docs = defineCollection({
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).passthrough(), // passthrough allows any additional frontmatter fields without validation
});

export const collections = { docs };
