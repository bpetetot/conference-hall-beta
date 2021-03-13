import { query } from 'express-validator'

const falsy = { checkFalsy: true }

export const SearchUsersCriterias = [query('email').trim().optional(falsy).isEmail()]
