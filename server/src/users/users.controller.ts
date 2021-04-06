import { Request } from 'express'
import { HttpException } from '../middleware/error'
import { UserMeDto } from '../dtos/UserMe.dto'
import * as usersRepository from '../db/users.repository'
import * as betaKeyRepository from '../db/betaKeys.repository'
import { SearchUserDto } from '../dtos/SearchUser.dto'

export async function checkUser(uid: string) {
  const user = await usersRepository.getUserByUid(uid)
  if (!user) {
    throw new HttpException(404, 'User not found')
  }
  return user
}

export async function getAuthenticatedUser(req: Request) {
  const { uid } = req.user
  const user = await usersRepository.getAuthUserByUid(uid)
  if (!user) {
    throw new HttpException(404, 'User not found')
  }
  return new UserMeDto(user)
}

export async function createAuthenticatedUser(req: Request) {
  const { uid, name, email, picture } = req.user
  const existingUser = await usersRepository.getUserByUid(uid)
  if (existingUser) {
    throw new HttpException(409, 'User already exists')
  }
  const user = await usersRepository.createUser(uid, name, email, picture)
  return new UserMeDto(user)
}

export async function updateAuthenticatedUser(req: Request) {
  const user = await checkUser(req.user.uid)
  await usersRepository.updateUser(user.uid, req.body)
}

export async function validateBetaAccess(req: Request) {
  const user = await checkUser(req.user.uid)
  const isValid = await betaKeyRepository.isBetaKeyValid(req.body?.key)
  if (!isValid) {
    throw new HttpException(404, 'Beta key not found')
  }
  await usersRepository.updateUser(user.uid, { betaAccess: req.body.key })
}

export async function searchUsers(req: Request) {
  const email = req.query.email as string
  const users = await usersRepository.findUsersBy({ email })
  return users.map((user) => new SearchUserDto(user))
}
