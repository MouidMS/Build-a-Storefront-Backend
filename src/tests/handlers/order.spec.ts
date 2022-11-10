import supertest from 'supertest';
import app from '../../server'
import { BaseUser, UserStore } from '../../models/user';
import { BaseOrder,OrderProduct} from '../../models/order';
import server from '../../server';

const req = supertest(app);
const userStore = new UserStore();


export let token :string;

describe('Order Handler', () => {

  let userData: BaseUser = {
    firstname: 'mouid',
    lastname: 'moahmed',
    username: 'mouid_x1',
    password: '1212',
};

  let orderData: BaseOrder = {
    user_id: 1,
    status: true
    };

    let orderProductData: OrderProduct = {
      quantity: 5,
      order_id: 1,
      product_id:1
}

    beforeAll(async () => {
      await userStore.create(userData)
          const response: supertest.Response = await req
          .post('/users/authenticate')
          .send({
            username: userData.username,
            password: userData.password
          })
          const { body } = response;
          token = body;

            await req
              .post('/products/create')
              .send({
                name: 'iphone x',
                price: 2000
              })
              .set('Authorization', `Bearer ${token}`)
      })
      
      it('create order', async function () {
        const response = await req
          .post('/orders/create')
          .send({
            userId: orderData.user_id,
            status: orderData.status
          })
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
      })

      it('index orders', async function () {
        const response = await req
          .get('/orders/')
          .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
      })

      it('add product to order', async function () {
        const response = await supertest(server).post("/orders/products/").send({
          quantity: orderProductData.quantity,
          orderid: orderProductData.order_id,
          productid: orderProductData.product_id
      })
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
      })

      it('show orders By user', async function () {
        const response: supertest.Response = await req
          .get('/orders/1')
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
      })

      it('update order by id', async function () {
        const response: supertest.Response = await req
          .put('/orders/3')
          .send({status:"false"})
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
      })

      it('update orderProduct by id', async function () {
        const response: supertest.Response = await req
          .put('/orders/product/3')
          .send({
            quantity:10,
            product_id:2
          })
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
      })

      it('delete order', async function () {
        const response: supertest.Response = await req
          .delete('/orders/1')
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
      })
      
  });