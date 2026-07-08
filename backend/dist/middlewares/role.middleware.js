"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
/**
 * Authorize route access to specific roles.
 * Must be used after the `authenticate` middleware.
 * @param roles Roles permitted to access the route
 */
const authorize = (...roles) => {
    return (req, res, next) => {
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
exports.authorize = authorize;
