import express from 'express';

const health = express.Router();

health.get(`/`, (req, res) => {
  console.log('Get health status');

  res.json({ health: `up`, date: new Date().toString() });
});

export { health };
