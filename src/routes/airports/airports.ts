import express from 'express';
import { ErrorMessage, prisma } from '../../utils';

const airports = express.Router();

airports.get(`/`, async (req, res) => {
  console.log('Get all airports');

  const airportsCollection = await prisma.airport.findMany({});

  res.json(airportsCollection);
});

airports.post(`/`, async (req, res) => {
  console.log('Creating a new airport');

  const airportName = req.body.name;

  if (!airportName) {
    const error = new ErrorMessage(400, 'You must provide a valid name`');
    console.log(error.getErrorMessage());
    return res.status(400).json(error.getErrorMessage());
  }

  const airportsCollection = await prisma.airport.findMany({});

  const alreadyExists = airportsCollection.find(
    (item) => item.name === airportName,
  );

  if (alreadyExists) {
    const error = new ErrorMessage(400, 'This airport already exists');
    console.log(error.getErrorMessage());
    return res.status(400).json(error.getErrorMessage());
  }

  const result = await prisma.airport.create({ data: { name: airportName } });

  console.log('Successfully created an airport');

  return res.status(201).json(result);
});

export { airports };
