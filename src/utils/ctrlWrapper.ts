import { Request, Response, NextFunction } from 'express';

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const ctrlWrapper = (controller: Controller) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
