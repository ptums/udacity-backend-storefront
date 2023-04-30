import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/users';

const request = supertest(app);
const userStore = new UserStore();

const testUser = {
  firstName: 'John',
  lastName: 'Doe5000',
  password: 'temppassword123',
};

describe('User Routes', () => {
  afterAll(async () => {
    await userStore.dropUserRecords();
  });

  describe('GET routes', () => {
    it('GET /users should return status 200', async () => {
      const authTestUser = await request.post(`/users/authenticate`).send(testUser);
      const res = authTestUser.body;

      if (Object.keys(res).includes('token')) {
        const token = res.token;
        const authBearer = `Bearer ${token}`;

        const response = await request.get('/users').set('Authorization', authBearer);

        if (response) {
          expect(response.status).toBe(200);
        }
      }
    });

    it('GET /users/:id should return status 200', async () => {
      const authTestUser = await request.post(`/users/authenticate`).send(testUser);
      const res = authTestUser.body;

      if (Object.keys(res).includes('token')) {
        const token = res.token;
        const authBearer = `Bearer ${token}`;
        const getUsers: User[] = await userStore.index();

        if (getUsers.length > 0) {
          const userId = getUsers[0].id;

          const response = await request.get(`/users/${userId}`).set('Authorization', authBearer);

          expect(response.status).toBe(200);
        }
      }
    });
  });

  describe('POST routes', () => {
    it('POST /users should return status 201', async () => {
      const authTestUser = await request.post(`/users/authenticate`).send(testUser);
      const res = authTestUser.body;

      if (Object.keys(res).includes('token')) {
        const token = res.token;
        const authBearer = `Bearer ${token}`;

        const response = await request.post('/users').set('Authorization', authBearer).send({
          firstName: 'John',
          lastName: 'Doe3',
          password: 'temppassword456',
        });

        console.log({ response });

        expect(response.status).toBe(201);
      }
    });
  });
});
