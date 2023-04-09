import express from 'express';
import { GenericMessage, prisma } from '../../utils';
import { InvitationStatus } from '@prisma/client';

const invitations = express.Router();

invitations.post(`/:userId`, async (req, res) => {
  const userId = req.params.userId;
  const { code } = req.body;

  // check if the body request is invalid
  if (!code) {
    const errorMessage = new GenericMessage(
      422,
      'Invalid or missing invitations code',
    );
    errorMessage.consoleMessage();
    return res.status(422).json(errorMessage.getMessage());
  }

  // retrieve the user
  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

  // check if the user doesn't exist
  if (!user) {
    const errorMessage = new GenericMessage(404, 'Unable to retrieve the user');
    errorMessage.consoleMessage();
    return res.status(404).json(errorMessage.getMessage());
  }

  // check if the user has an invitations  code
  const userCode = user.code;
  const invitationStatus = user.status;
  if (!userCode && invitationStatus !== InvitationStatus.PENDING) {
    const errorMessage = new GenericMessage(
      404,
      'There is no invitations code available',
    );
    return res.status(404).json(errorMessage.getMessage());
  }

  // check if the code is valid
  if (code !== userCode) {
    const errorMessage = new GenericMessage(400, 'Invitation code is invalid');
    errorMessage.consoleMessage();
    return res.status(400).json(errorMessage.getMessage());
  }

  // update the user invitations status and clear the invitations code
  await prisma.user.update({
    where: { id: Number(userId) },
    data: { status: InvitationStatus.VERIFIED, code: null },
  });

  const successMessage = new GenericMessage(
    200,
    'Invitation accepted successfully',
  );
  successMessage.consoleMessage();
  res.status(200).json(successMessage.getMessage());
});

export { invitations };
