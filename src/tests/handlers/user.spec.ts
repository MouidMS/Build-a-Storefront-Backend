import supertest from 'supertest';
import Client from '../../database';

import { BaseUser, UserStore } from '../../models/user';
import app from '../../server'

const req = supertest(app);

const userStore = new UserStore();
export let token :string;

describe('User Handler', () => {
  let userData: BaseUser = {
        firstname: 'mouid',
        lastname: 'moahmed',
        username: 'mouid_x1',
        password: '1212',
    };

    beforeAll(async () => {
        userData = await userStore.create(userData)
      })

      
      it('check if authentication working', async function () {
        const response = await req
          .post('/users/authenticate')
          .send({
            username: userData.username,
            password: '1212'
          })
          const { body } = response;
          token = body;
        expect(response.status).toEqual(200)
      })

      it('check if authentication not working', async function () {
        const response = await req
          .post('/users/authenticate')
          .send({
            username: userData.username,
            password: '0000'
          })
        expect(response.status).toEqual(401)
      })

      it('get all users', async function () {
        const response = await req
          .get('/users/')
          .set('Authorization', `Bearer ${token}`)
          expect(response.status).toEqual(200)
      })

      it('get one user', async function () {
        const response = await req
          .get('/users/3')
          .set('Authorization', `Bearer ${token}`)
          expect(response.body.username).toEqual("mouid_x1")
          expect(response.body.id).toEqual(3)

      })

      it('create new user', async function () {
        const response = await req
          .post('/users/create')
          .send({
            firstname: 'fahad',
            lastname: 'ahmed',
            username: 'fahad_xd',
            password: '1234',
          })
          expect(response.status).toEqual(200)
      })

      it('update user', async function () {
        const response= await req
          .put('/users/3')
          .send({
            firstname: 'Fahad',
            lastname: 'Omar',
            username: 'fahad_oamr',
          })
          .set('Authorization', `Bearer ${token}`)
          expect(response.status).toEqual(200)
      })
      
      it('delete user', async function () {
        const response = await req
          .delete('/users/2')
          .set('Authorization', `Bearer ${token}`)
          expect(response.status).toEqual(200)
      })

    

  });