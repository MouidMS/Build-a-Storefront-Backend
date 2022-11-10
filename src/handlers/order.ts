import { Application, Request, Response } from 'express';
import { verifyToken } from "../helpers/verify_token";
import { Order, OrderProduct, OrderStore } from '../models/order';

const orderStore = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await orderStore.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const id= parseInt(req.params.id)
    const order: Order = await orderStore.show(id);
    res.json(order);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const id= parseInt(req.params.id)
    const status = req.body.status as unknown as boolean;
    const order: Order = await orderStore.updateOrder(id, 
      status
    );
    res.json(order);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};


const updateOrderProduct = async (req: Request, res: Response) => {
  try {
    const quantity = req.body.quantity as unknown as number;
    const order_id= parseInt(req.params.id)
    const product_id = req.body.product_id as unknown as number;

    const order: Order = await orderStore.updateOrderProduct(quantity, 
      order_id,product_id
    );

    res.json(order);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id= parseInt(req.params.id)
    await orderStore.delete(id);

    res.send(`successfully deleted`);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const showOrdersByUser = async(req: Request,res: Response): Promise <void> => {
  try {
  const orders = await orderStore.FindOrderByUser(req.params.userId)
  res.json(orders) } catch (error) {
      res.status(400)
  res.json(error)
  }
}

const showProductsByOrderId = async(req: Request,res: Response): Promise <void> => {
  try {
      const products = await orderStore.FindProductByOrderId(req.params.id)
  res.json(products) } catch (error) {
      res.status(400)
  res.json(error)
  }
}

const create = async(req: Request,res: Response): Promise <void> => {
  const order = {
    user_id: req.body.userId,
    status: req.body.status
  }
  try {
      const Order = await orderStore.create(order)
      res.json(Order)
  } catch (error) {
      res.status(400)
      res.json(error)
  }
}

const addProductToOrder = async(req: Request,res: Response): Promise <void> => {
  const op: OrderProduct = {
      quantity: req.body.quantity,
      order_id: req.body.orderid,
      product_id: req.body.productid
  }
  try {
      const order = await orderStore.addProductInOrder(op)
      res.json(order)

  } catch (error) {
      res.status(400)
      res.json(error)
  }
}

export default function order_routes(app: Application) {
  app.get('/orders',verifyToken, index);
  app.post('/orders/create', verifyToken, create); 
  app.post("/orders/products", verifyToken, addProductToOrder)
  app.get("/orders/:userId", verifyToken, showOrdersByUser); 
  app.get("/orders/products/:id", verifyToken, showProductsByOrderId);
  app.put('/orders/:id', verifyToken, updateOrder);
  app.put('/orders/product/:id', verifyToken, updateOrderProduct);
  app.delete('/orders/:id', verifyToken, deleteOrder);
}