import * as dotenv from 'dotenv';
import express from 'express';
import { airports, health } from './routes';
import cors from 'cors';
import { authentication } from './middlewares';

dotenv.config();

const app = express();
const url = process.env.API_URL;
const port = process.env.API_PORT;

const bootstrap = () => {
  // middlewares
  // app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.json());
  app.use(cors());

  // public routes
  app.use(`/`, health);

  // authentication middleware
  app.use(authentication);

  // private routes
  app.use(`/airports`, airports);

  app.listen(port, () => {
    console.log(`Server is up and running 🚀`);
  });
};

bootstrap();
