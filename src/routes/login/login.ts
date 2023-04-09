import * as bcrypt from 'bcryptjs';
import express from 'express';
import { GenericMessage, prisma } from '../../utils';
import { createAccessToken } from '../../middlewares';

const login = express.Router();

login.post(`/`, async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  // check if the user exist
  if (!user) {
    const errorMessage = new GenericMessage(401, 'Invalid email or password');
    errorMessage.consoleMessage();
    return res.status(401).json(errorMessage.getMessage());
  }

  // check if the password is valid
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const errorMessage = new GenericMessage(401, 'Invalid password');
    errorMessage.consoleMessage();
    return res.status(401).json(errorMessage.getMessage());
  }

  const accessToken = createAccessToken(user);
  new GenericMessage(200, 'Successfully logged in').consoleMessage();
  res.status(200).json({ ...user, accessToken });
});

export { login };
