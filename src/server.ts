import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {
  airports,
  companies,
  health,
  invitations,
  login,
  register,
} from './routes';
import { verifyAccessToken } from './middlewares';

dotenv.config();
const app = express();
const port = process.env.API_PORT!;

const bootstrap = () => {
  // general middlewares
  // app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.json());
  app.use(cors());

  // public routes
  app.use(`/`, health);
  app.use(`/register`, register);
  app.use(`/login`, login);
  app.use(`/invitations`, invitations);

  // verify jwt middleware, must be used before every private routes
  app.use(verifyAccessToken);

  // private routes
  app.use(`/airports`, airports);
  app.use(`/companies`, companies);

  // start the server on a specific port
  app.listen(port, () => {
    console.log(`Server is up and running 🚀`);
  });
};

bootstrap();
