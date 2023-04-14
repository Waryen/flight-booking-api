import express from 'express';
import { GenericMessage, prisma } from '../../utils';

const companies = express.Router();

// Get all companies
companies.get(`/`, async (req, res) => {
  const companies = await prisma.company.findMany();
  const successMessage = new GenericMessage(200, 'Get all companies');
  successMessage.consoleMessage();
  res.status(200).json(companies);
});

// Get one company
companies.get(`/:id`, async (req, res) => {
  const companyId = req.params.id;
  const company = await prisma.company.findUnique({
    where: { id: Number(companyId) },
  });

  // check if company doesn't exist
  if (!company) {
    const errorMessage = new GenericMessage(404, "This company doesn't exist");
    errorMessage.consoleMessage();
    return res.status(404).json(errorMessage.getMessage());
  }

  new GenericMessage(
    200,
    `Company: ${company.name} successfully found`,
  ).consoleMessage();
  res.status(200).json(company);
});

// Create a new company
companies.post(`/`, async (req, res) => {
  const { name } = req.body;

  // check if body is invalid
  if (!name) {
    const errorMessage = new GenericMessage(400, 'Invalid body format');
    errorMessage.consoleMessage();
    return res.status(400).send(errorMessage.getMessage());
  }

  // check if company already exist
  const existingCompany = await prisma.company.findUnique({ where: { name } });
  if (existingCompany) {
    const errorMessage = new GenericMessage(400, 'This company already exist');
    errorMessage.consoleMessage();
    return res.status(400).json(errorMessage.getMessage());
  }

  const createdCompany = await prisma.company.create({ data: { name } });
  const successMessage = new GenericMessage(
    201,
    `Company: ${name} successfully created`,
  );
  successMessage.consoleMessage();
  res.status(201).json(createdCompany);
});

// Update a company
companies.put(`/:id`, async (req, res) => {
  const companyId = req.params.id;
  const { name: newName } = req.body;

  // check if the body is invalid
  if (!newName) {
    const errorMessage = new GenericMessage(400, 'Invalid body format');
    errorMessage.consoleMessage();
    return res.status(400).json(errorMessage.getMessage());
  }

  // check if the company doesn't exist
  const existingCompany = await prisma.company.findUnique({
    where: { id: Number(companyId) },
  });
  if (!existingCompany) {
    const errorMessage = new GenericMessage(400, "This company doesn't exist");
    errorMessage.consoleMessage();
    return res.status(400).json(errorMessage.getMessage());
  }

  // update the company
  const updatedCompany = await prisma.company.update({
    where: { id: Number(companyId) },
    data: { name: newName },
  });
  const successMessage = new GenericMessage(
    200,
    'Company successfully updated',
  );
  successMessage.consoleMessage();
  res.status(200).json(updatedCompany);
});

// Delete a company
companies.delete(`/:id`, async (req, res) => {
  const companyId = req.params.id;

  // check if company doesn't exist
  const existingCompany = await prisma.company.findUnique({
    where: { id: Number(companyId) },
  });
  if (!existingCompany) {
    const errorMessage = new GenericMessage(404, "This company doesn't exist");
    errorMessage.consoleMessage();
    return res.status(404).json(errorMessage.getMessage());
  }

  await prisma.company.delete({
    where: { id: Number(companyId) },
  });
  const successMessage = new GenericMessage(
    200,
    `Company: ${existingCompany.name} has been successfully deleted`,
  );
  successMessage.consoleMessage();
  res.status(200).json(successMessage.getMessage());
});

export { companies };
