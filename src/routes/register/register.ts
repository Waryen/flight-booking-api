import express from 'express';
import { GenericMessage, prisma } from '../../utils';
import { createAccessToken } from '../../middlewares';

const register = express.Router();

register.post(`/`, async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  // check if the body is valid
  if (!email || !password || !firstname || !lastname) {
    const errorMessage = new GenericMessage(
      422,
      'Unable to register the user',
      'Missing or malformed information in the body request',
    );
    errorMessage.consoleMessage();
    return res.status(422).json(errorMessage.getMessage());
  }

  // check if the user already exist
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const errorMessage = new GenericMessage(409, 'Unable to register the user');
    errorMessage.consoleMessage();
    return res.status(409).json(errorMessage.getMessage());
  }

  // create the user and his access token
  const user = await prisma.user.create({
    data: { email, password, firstname, lastname },
  });
  const accessToken = createAccessToken(user);

  new GenericMessage(201, 'Account successfully created').consoleMessage();
  res.status(201).json({ ...user, accessToken });
});

export { register };
