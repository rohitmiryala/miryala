import { Request, Response, NextFunction } from 'express';

export const notFound = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ success: false, message: 'Route not found' });
};
