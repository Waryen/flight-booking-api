import * as dotenv from 'dotenv';
import express from 'express';
import { airports, health } from './routes';
import cors from 'cors';

dotenv.config();

const app = express();
const url = process.env.API_URL;
const port = process.env.API_PORT;

const bootstrap = () => {
  app.use(express.json());
  app.use(cors());

  app.use(`/`, health);
  app.use(`/airports`, airports);

  app.listen(port, () => {
    console.log(`Server listening on ${url}:${port} 🚀`);
  });
};

bootstrap();
