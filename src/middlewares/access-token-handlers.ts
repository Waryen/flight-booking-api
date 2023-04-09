import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { GenericMessage, prisma } from '../utils';
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

    // check if the user has been verified
    const { id } = decoded as User;
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      const errorMessage = new GenericMessage(404, "This user doesn't exist");
      errorMessage.consoleMessage();
      return res.status(404).json(errorMessage.getMessage());
    }

    if (user.status !== InvitationStatus.VERIFIED) {
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
