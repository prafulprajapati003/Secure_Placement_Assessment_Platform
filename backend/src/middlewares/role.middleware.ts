import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';

/**
 * Authorize route access to specific roles.
 * Must be used after the `authenticate` middleware.
 * @param roles Roles permitted to access the route
 */
export const authorize = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden. Access restricted to roles: [${roles.join(', ')}]. Current role: '${req.user.role}'`
      });
      return;
    }

    next();
  };
};
