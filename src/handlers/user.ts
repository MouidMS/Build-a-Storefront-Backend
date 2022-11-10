import { Application, Request, Response } from 'express';
import { getTokenByUser } from '../helpers/token';
import { verifyToken } from "../helpers/verify_token";
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';


const userStore = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await userStore.index();
    res.json(users);
  } catch (err) {
    throw new Error(`Could not get users. Error: ${err}`)
  }
};

const create = async (req: Request, res: Response) => {
  const firstname = req.body.firstname as unknown as string;
  const lastname = req.body.lastname as unknown as string;
  const username = req.body.username as unknown as string;
  const password = req.body.password as unknown as string;
  try {
    const user: User = await userStore.create({
      firstname,
      lastname,
      username,
      password,
    });
    const token = jwt.sign({ user }, process.env.TOKEN as unknown as string);
    res.json({
    user, token
    });
  } catch (err) {
    res.status(400)
    res.json(err)
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id= parseInt(req.params.id)
    const user = await userStore.show(id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json({ error })
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id= parseInt(req.params.id)
    const firstname = req.body.firstname as unknown as string;
    const lastname = req.body.lastname as unknown as string;
    const user: User = await userStore.update(
      firstname,
      lastname,
      id
);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id= parseInt(req.params.id)
    await userStore.delete(id);
    res.send(`User with id ${id} successfully deleted.`);
  } catch (err) {
    res.status(400).json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const username = (req.body.username as unknown as string) ;
    const password = (req.body.password as unknown as string) ;
    const u = await userStore.authenticate(username, password)
    if (!u) {
      return res.status(401).send(`Wrong password.`);
    }
    res.json(getTokenByUser(u));
  } catch (error) {
    res.status(400)
    res.json({error})
  }
};

export default function user_routes(app: Application) {
  app.get('/users', verifyToken, index);
  app.post('/users/create', verifyToken,create);
  app.get('/users/:id', verifyToken, show);
  app.put('/users/:id', verifyToken, update);
  app.delete('/users/:id', verifyToken, deleteUser);
  app.post('/users/authenticate', authenticate);
}