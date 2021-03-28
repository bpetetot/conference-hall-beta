import { Invite } from '@prisma/client'

export class InviteDto {
  uuid: string

  constructor(invite: Invite) {
    this.uuid = invite.uuid
  }
}
