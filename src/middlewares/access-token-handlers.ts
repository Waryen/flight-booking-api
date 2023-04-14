import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { GenericMessage } from '../utils';
import { InvitationStatus, User } from '@prisma/client';

dotenv.config();
const privateKey = process.env.PRIVATE_KEY!;
const accessTokenDuration = process.env.ACCESS_TOKEN_DURATION!;

export const verifyAccessToken: RequestHandler = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const clientToken = authorizationHeader && authorizationHeader.split(' ')[1];

  const errorMessage = new GenericMessage(
    401,
    'Unauthorized access',
    'Invalid or missing access token',
  );

  // check if an access token has been provided
  if (!clientToken) {
    errorMessage.consoleMessage();
    return res.status(401).json(errorMessage.getMessage());
  }

  // verify the access token
  jwt.verify(clientToken, privateKey, async (err, decoded) => {
    if (err || !decoded) {
      errorMessage.consoleMessage();
      return res.status(401).json(errorMessage.getMessage());
    }

    // check if the user has not been verified yet
    const { status } = decoded as User;
    if (status !== InvitationStatus.VERIFIED) {
      const errorMessage = new GenericMessage(
        401,
        'This user has not been verified yet',
      );
      errorMessage.consoleMessage();
      return res.status(401).json(errorMessage.getMessage());
    }

    return next();
  });
};

export const createAccessToken = (user: User) => {
  return jwt.sign(user, privateKey, { expiresIn: accessTokenDuration });
};
