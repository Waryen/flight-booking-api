import express from 'express';
import { getDefaultLog } from '../../utils';

const health = express.Router();

health.get(`/`, (req, res) => {
  getDefaultLog('Get health status');

  res.json({ health: `up`, date: new Date().toString() });
});

export { health };
