import supertest from 'supertest';
import Client from '../../database';
import { BaseProduct } from '../../models/product';
import app from '../../server'
import { BaseUser, UserStore } from '../../models/user';

const req = supertest(app);
const userStore = new UserStore();

export let token :string;

describe('Product Handler', () => {

  let userData: BaseUser = {
    firstname: 'mouid',
    lastname: 'moahmed',
    username: 'mouid_x1',
    password: '1212',
};
  
  
  let productData: BaseProduct = {
      name:"Iphone 14 pro max",
      price:3800
    };

    beforeAll(async () => {
        await userStore.create(userData);
          const response: supertest.Response = await req
          .post('/users/authenticate')
          .send({
            username: userData.username,
            password: userData.password
          })
          const { body } = response;
          token = body;
      })

      afterAll(async () => {
        const connect = await Client.connect()
       
        const sql3 = 'DELETE from orders'
        await connect.query(sql3)
        const sql2 = 'DELETE from products'
        await connect.query(sql2)
        const sql = 'DELETE from users'
        await connect.query(sql)
        connect.release()
      })
      
      it('create product', async function () {
        const response = await req
          .post('/products/create')
          .send({
            name: productData.name,
            price: productData.price
          })
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
      })

      it('index products', async function () {
        const response = await req
          .get('/products/')
        expect(response.status).toEqual(200)
      })

      it('show one product', async function () {
        const response = await req
          .get('/products/1')
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
      })

      it('update product', async function () {
        const response = await req
          .put('/products/1')
          .send({
            name: "iphone 13",
            price: 2900
          })
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
      })

      it('delete product', async function () {
        const response = await req
          .delete('/products/1')
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
      })

  });