import express from 'express';
import { getDefaultLog } from '../../utils';

const health = express.Router();

health.get(`/`, (req, res) => {
  getDefaultLog(200, 'Get health status');

  res.status(200).json({ health: `up`, date: new Date().toString() });
});

export { health };
