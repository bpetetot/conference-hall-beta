import { User } from '@prisma/client'
import { ProposalsResults } from '../db/proposals.repository'
import { OrganizerProposalDto } from './OrganizerProposal.dto'

export class OrganizerProposalsResult {
  proposals: OrganizerProposalDto[]
  total: number
  page: number
  pageSize: number
  pageCount: number | null
  nextPage: number | null
  previousPage: number | null

  constructor(user: User, result: ProposalsResults) {
    this.proposals = result.proposals.map((proposal) => new OrganizerProposalDto(user, proposal))
    this.total = result.total
    this.page = result.page
    this.pageSize = result.pageSize
    this.pageCount = result.pageCount
    this.nextPage = result.nextPage
    this.previousPage = result.previousPage
  }
}