import express from 'express';
import { GenericMessage, prisma } from '../../utils';
import { createAccessToken } from '../../middlewares';

const login = express.Router();

login.post(`/`, async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const errorMessage = new GenericMessage(401, 'Invalid email or password');
    errorMessage.consoleMessage();
    return res.status(401).json(errorMessage.getMessage());
  }

  const isPasswordValid = user.password === password;

  if (!isPasswordValid) {
    const errorMessage = new GenericMessage(401, 'Invalid password');
    errorMessage.consoleMessage();
    return res.status(401).json(errorMessage.getMessage());
  }

  const accessToken = createAccessToken(user);
  res.status(201).json({ ...user, accessToken });
});

export { login };
