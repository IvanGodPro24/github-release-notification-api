import { Request, Response } from 'express';
import { SubscribeInput } from '../validation/subscription.schema.js';

export const subscribe = async (req: Request, res: Response) => {
  const { email, repo } = req.body as SubscribeInput;

  const [owner, repoName] = repo.split('/');

  res.json({ message: 'Format valid' });
};
