import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
  
    if (!req.headers.authorization) {
      _res.status(401).json({ error: 'Access denied, plaese input token' });
      return false;
    }
    try {
      const bearer = req.headers.authorization.split(' ')[0].toLowerCase()
      const token = req.headers.authorization.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode =  jwt.verify(token, process.env.TOKEN as Secret);
        if (decode) {
          next()
        } else {
          _res.status(401);
          _res.json("Access denied, token it's invalide");
          return;      
        }
      }
    }catch (err) {
   _res.status(401);
   _res.json("Access denied, token it's invalide");
   return;      
    }
}