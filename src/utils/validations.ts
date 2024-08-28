import { z } from 'zod';

export const postSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  author: z.string(),
});
export type expectedDataShape = z.infer<typeof postSchema>;
