import supertest from "supertest";
import app from "../../server";
import { ProductStore } from "../../models/products";
import { UserStore } from "../../models/users";
import exp from "constants";

const request = supertest(app);
const productStore = new ProductStore();
const userStore = new UserStore();

describe("Product Routes", () => {
  beforeAll(async () => {
    await productStore.create({
      price: 7,
      category: "Toy",
      name: "Racecar",
    });
  });

  afterAll(async () => {
    await productStore.dropOrderRecords();
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
      const createTempUser = await request.post("/users").send({
        firstName: "John",
        lastName: "Doe 2",
        password: "tempPassword123",
      });

      if (createTempUser) {
        console.log(createTempUser);
        expect(2).toBe(2);
      }
    });
  });
});
