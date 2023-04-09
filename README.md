# Flight Booking API Management ✈️

A Node.js API to manage flight bookings.

## Get started
- At least Node.js version 16 installed
- Fill required environment variables
- run `npm install` to install the dependencies
- run `npm run generate:key` to generate a private key for signing JWT, the key must be inserted in the .env file
- run `npm run build` to build the service
- run `npm start` to start the service, must be built first

## What does this service can do?
- Airports
  - Retrieve a collection of all registered airports
  - Retrieve a specific airport
  - Register an airport
  - Update a registered airport
  - Delete a registered airport

## Tech stack

- Node.js
- Express.js
- Prisma
- PostgreSQL
- TypeScript

## Environment variables example
- API_PORT=9000
- PRIVATE_KEY=a private key to sign JWT
- ACCESS_TOKEN_DURATION=specify a duration for the JWT token
- DATABASE_URL=postgres://jonathan@localhost:5432/flight-booking
