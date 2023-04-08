import express, { RequestHandler } from 'express';
import * as dotenv from 'dotenv';
import { ErrorMessage } from '../utils';

dotenv.config();

const app = express();
const anonKey = process.env.ANON_KEY;

export const authentication: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const cleanedToken = token.replace(/^Bearer\s*/, '');
    if (cleanedToken !== anonKey) {
      const error = new ErrorMessage(
        401,
        'Unauthorized access',
        'Malformed access token',
      );
      error.consoleErrorMessage();
      return res.status(401).json(error.getErrorMessage());
    } else {
      return next();
    }
  }

  next();
};
