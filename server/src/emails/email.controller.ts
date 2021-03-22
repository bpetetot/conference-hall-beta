import { Request } from 'express'
import { HttpException } from '../middleware/error'
import * as proposalsRepository from '../db/proposals.repository'
import { EmailStatus } from '.prisma/client'

export async function onEmailDelivered(req: Request) {
  const userVariables = req.body['event-data']['user-variables']

  if (!userVariables || !userVariables.proposalId) {
    throw new HttpException(400, 'Bad request')
  }

  try {
    const proposalId = parseInt(userVariables.proposalId)
    await proposalsRepository.updateProposal(proposalId, { emailStatus: EmailStatus.DELIVERED })
  } catch (error) {
    throw new HttpException(400, error.message)
  }
}
