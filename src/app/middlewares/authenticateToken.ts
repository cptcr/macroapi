import { Request, Response, NextFunction } from 'express';
import c from "../config";
const config = c();
import { ok, request, failedRequest } from '../tools/logs';

// Middleware to authenticate API token
export function authenticateToken(req: Request, res: Response, next: NextFunction): any {
  const token = req.header('Authorization')?.replace('Bearer ', '').replace(" ", ""); // Extract token from the Authorization header

  if (!token) {
    failedRequest(`No endpoint provided.`, `${req.ip}`, `${token}`, { ratelimit: true, error: `No token provided.`})
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  if (!config.apiKeys.includes(token)) {
    failedRequest(`${req}`, `${req.ip}`, `${token}`, { ratelimit: true, error: "Invalid token."})
    return res.status(403).json({ message: 'Invalid token.' });
  }

  next();
}
