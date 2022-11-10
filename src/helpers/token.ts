
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../models/user';
import dotenv from 'dotenv';
dotenv.config();

export const getTokenByUser = (user: User) => {
    return jwt.sign({ user }, process.env.TOKEN as Secret);
  };