import { z } from 'zod';

export const subscribeSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    repo: z
      .string()
      .regex(
        /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/,
        'Invalid repo format. Use owner/repo',
      ),
  }),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>['body'];
