import supertest from 'supertest';
import app from '../../server';
import { ProductStore } from '../../models/products';
import { UserStore } from '../../models/users';
import { OrderStore } from '../../models/orders';

const request = supertest(app);
const productStore = new ProductStore();
const userStore = new UserStore();
const orderStore = new OrderStore();

const testUser = {
  firstName: 'john',
  lastName: 'doe3',
  password: 'udacity-project',
};

describe('Order Routes', () => {
  beforeAll(async () => {
    const testOrderProduct = await productStore.create({
      price: 6.5,
      category: 'Toy',
      name: 'Truck',
    });

    const testOrderUser = await userStore.create(testUser);

    if (testOrderProduct && testOrderUser) {
      await orderStore.create({
        product_id: testOrderProduct.id as number,
        quantity: 2,
        user_id: testOrderUser.id as number,
        status: 'complete',
      });

      await orderStore.create({
        product_id: testOrderProduct.id as number,
        quantity: 5,
        user_id: testOrderUser.id as number,
        status: 'active',
      });
    }
  });

  afterAll(async () => {
    await orderStore.dropOrderRecords();
    await productStore.dropProductRecords();
    await userStore.dropUserRecords();
  });

  describe('GET routes', () => {
    it('GET /orders/:id should return status 200', async () => {
      const authTestUser = await request.post(`/users/authenticate`).send(testUser);
      const res = authTestUser.body;

      if (Object.keys(res).includes('token')) {
        const currentUser = await userStore.findUser(testUser.firstName, testUser.lastName);
        const token = res.token;
        const authBearer = `Bearer ${token}`;

        if (currentUser) {
          const userOrders = await request.get(`/orders/${currentUser.id}`).set('Authorization', authBearer);

          expect(userOrders.statusCode).toBe(200);
        }
      }
    });

    it('GET /orders/:status/:id should return status 200', async () => {
      const authTestUser = await request.post(`/users/authenticate`).send(testUser);
      const res = authTestUser.body;

      if (Object.keys(res).includes('token')) {
        const currentUser = await userStore.findUser(testUser.firstName, testUser.lastName);
        const token = res.token;
        const authBearer = `Bearer ${token}`;

        if (currentUser) {
          const userOrders = await request.get(`/orders/complete/${currentUser.id}`).set('Authorization', authBearer);

          expect(userOrders.statusCode).toBe(200);
        }
      }
    });
  });
});
