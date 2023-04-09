import express from 'express';
import { GenericMessage, prisma } from '../../utils';

const airports = express.Router();

// Get a collection of airports
airports.get(`/`, async (req, res) => {
  new GenericMessage(200, 'Get all airports').consoleMessage();

  const airportsCollection = await prisma.airport.findMany({});

  res.json(airportsCollection);
});

// Get a specific airport
airports.get(`/:id`, async (req, res) => {
  const airportId = req.params.id;

  // check if the airport exist
  const existingAirport = await prisma.airport.findUnique({
    where: { id: Number(airportId) },
  });
  if (!existingAirport) {
    const errorMessage = new GenericMessage(400, "This airport doesn't exist");
    errorMessage.consoleMessage();
    return res.status(400).json(errorMessage.getMessage());
  }

  // return the airport
  const successMessage = new GenericMessage(200, 'Get airport');
  successMessage.consoleMessage();
  res.status(200).json(existingAirport);
});

// Create an airport
airports.post(`/`, async (req, res) => {
  new GenericMessage(200, 'Creating a new airport').consoleMessage();

  const airportName = req.body.name;

  if (!airportName) {
    const errorMessage = new GenericMessage(
      400,
      'You must provide a valid name',
    );
    errorMessage.consoleMessage();
    return res.status(400).json(errorMessage.getMessage());
  }

  const airportsCollection = await prisma.airport.findMany({});

  const alreadyExists = airportsCollection.find(
    (item) => item.name === airportName,
  );

  if (alreadyExists) {
    const errorMessage = new GenericMessage(400, 'This airport already exists');
    errorMessage.consoleMessage();
    return res.status(400).json(errorMessage.getMessage());
  }

  const result = await prisma.airport.create({ data: { name: airportName } });

  new GenericMessage(201, 'Successfully created an airport').consoleMessage();

  return res.status(201).json(result);
});

// Update an airport
airports.put(`/:id`, async (req, res) => {
  const airportId = req.params.id;
  const { name } = req.body;

  // check if the body is invalid
  if (!name) {
    const errorMessage = new GenericMessage(400, 'Invalid body request');
    errorMessage.consoleMessage();
    return res.status(400).json(errorMessage.getMessage());
  }

  // check if the airport exist
  const existingAirport = await prisma.airport.findUnique({
    where: { id: Number(airportId) },
  });
  if (!existingAirport) {
    const errorMessage = new GenericMessage(
      400,
      'Unable to update the airport',
    );
    errorMessage.consoleMessage();
    return res.status(400).json(errorMessage.getMessage());
  }

  // update the airport
  const airport = await prisma.airport.update({
    where: { id: Number(airportId) },
    data: { name },
  });

  new GenericMessage(200, 'Successfully updated the airport').consoleMessage();
  res.status(201).json(airport);
});

// Delete an airport
airports.delete(`/:id`, async (req, res) => {
  const airportId = req.params.id;

  // check if the airport exist
  const existingAirport = await prisma.airport.findUnique({
    where: { id: Number(airportId) },
  });
  if (!existingAirport) {
    const errorMessage = new GenericMessage(
      400,
      'Unable to update the airport',
    );
    errorMessage.consoleMessage();
    return res.status(400).json(errorMessage.getMessage());
  }

  // delete the airport
  await prisma.airport.delete({ where: { id: Number(airportId) } });

  const successMessage = new GenericMessage(
    200,
    'Successfully deleted the airport',
  );
  successMessage.consoleMessage();
  res.status(201).json(successMessage.getMessage());
});

export { airports };
