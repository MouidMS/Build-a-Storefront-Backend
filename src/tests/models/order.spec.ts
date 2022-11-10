import { OrderStore, BaseOrder, Order } from '../../models/order';
import { UserStore } from '../../models/user';
import Client from '../../database';

// not finsh
const userStore = new UserStore();
const orderStore = new OrderStore();


describe('Test Order Model', () => {
  const testUser = {
    username: 'mouid_x1',
    firstname: 'mouid',
    lastname: 'mohamed',
    password: '1212',
  };
    beforeAll(async () => {
        await  userStore.create(testUser);
      })
      afterAll(async () => {
        const connect = await Client.connect()
        const sql2 = 'DELETE from orders'
        await connect.query(sql2)
        const sql = 'DELETE from users'
        await connect.query(sql)
        connect.release()
      })
 
  it('should have index method', () => {
    expect(orderStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('should have a remove method', () => {
    expect(orderStore.delete).toBeDefined();
  });


  it('create add a order', async () => {
    const result = await orderStore.create({
        user_id: 3,
        status: true,
    });
    expect(result).toEqual({
      id: 2,
      user_id: 3,
      status: true,
    });
 });

it('index list of orders', async () => {
  const result = await orderStore.index();
  expect(result.length).toEqual(1)
});

});


