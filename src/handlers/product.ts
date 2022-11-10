import { Application, Request, Response } from 'express';
import { ProductStore } from '../models/product';
import { verifyToken } from "../helpers/verify_token";

const productStore = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await productStore.index();
    res.json(products);
  } catch (error) {
    res.status(400)
    res.json({ error })
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;
    const product = await productStore.create({ name, price });
    res.json({
      product,
    });
  } catch (error) {
    res.status(400)
    res.json({ error })
   
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id= parseInt(req.params.id)
    const product = await productStore.show(id);
    res.json(product);
  } catch (error) {
    res.status(400)
    res.json({ error })
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id= parseInt(req.params.id)
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;
    const product = await productStore.update(id, {
      name,
      price,
    });
    res.json(product);
  } catch (error) {
    res.status(400)
    res.json({ error })
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id= parseInt(req.params.id)
    await productStore.delete(id);
    res.send(`successfully Delete`);
  } catch (error) {
    res.status(400)
    res.json({ error })
  }
};

export default function product_routes(app: Application) {
  app.get('/products', index);
  app.post('/products/create', verifyToken, create);
  app.get('/products/:id', verifyToken,show);
  app.put('/products/:id', verifyToken, update);
  app.delete('/products/:id', verifyToken, deleteProduct);
}