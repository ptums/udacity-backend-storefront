import supertest from "supertest";
import app from "../../server";
import { ProductStore } from "../../models/products";
import { UserStore } from "../../models/users";

const request = supertest(app);
const productStore = new ProductStore();
const userStore = new UserStore();

const testProductUser = {
  firstName: "John",
  lastName: "Doe2",
  password: "temppassword123",
};

const testProductOne = {
  price: 7,
  category: "Toy",
  name: "Racecar",
};

const testProductTwo = {
  price: 10,
  category: "Toy",
  name: "Castle",
};

describe("Product Routes", () => {
  beforeAll(async () => {
    await productStore.create(testProductOne);

    await userStore.create(testProductUser);
  });

  afterAll(async () => {
    await productStore.dropProductRecords();
  });

  describe("GET routes", () => {
    it("GET /products should return status 200", async () => {
      const response = await request.get("/products");

      if (response) {
        expect(response.status).toBe(200);
      }
    });

    it("GET /product/:id should return status 200", async () => {
      const createProduct = await productStore.create({
        price: 10,
        category: "Toy",
        name: "Pirate ship",
      });

      if (createProduct) {
        const response = await request.get(`/product/${createProduct.id}`);

        if (response) {
          expect(response.status).toBe(200);
        }
      }
    });
  });

  describe("POST routes", () => {
    it("POST /products should return status 201", async () => {
      const authTestUser = await request
        .post(`/users/authenticate`)
        .send(testProductUser);
      const res = authTestUser.body;

      if (Object.keys(res).includes("token")) {
        const token = res.token;
        const authBearer = `Bearer ${token}`;

        const createProduct = await request
          .post(`/products`)
          .set("Authorization", authBearer)
          .send(testProductTwo);

        expect(createProduct.statusCode).toBe(201);
      }
    });
  });
});
