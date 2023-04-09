import express from 'express';
import { GenericMessage } from '../../utils';

const health = express.Router();

health.get(`/`, (req, res) => {
  new GenericMessage(200, 'Get health status').consoleMessage();

  res.status(200).json({ health: `up`, date: new Date().toString() });
});

export { health };
