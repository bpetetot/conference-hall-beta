import { Invite } from '@prisma/client'

export class InvitationInfoDto {
  type: 'ORGANIZATION' | 'SPEAKER'
  label: string
  entityId: number

  constructor(invite: Invite, label: string) {
    this.type = invite.type
    this.entityId = invite.entityId
    this.label = label
  }
}
