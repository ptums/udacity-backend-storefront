import { Order, OrderStore } from "../../models/orders";
import { Product, ProductStore } from "../../models/products";
import { User, UserStore } from "../../models/users";

const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

describe("OrderStore", () => {
  beforeAll(async () => {
    // Connect to the database before running the tests

    await productStore.create({
      price: 6.5,
      category: "Toy",
      name: "Barbie",
    });

    await userStore.create({
      firstName: "john",
      lastName: "doe",
      password: "udacity-project",
    });

    await orderStore.create({
      product_id: 1,
      quantity: 2,
      user_id: 1,
      status: "created",
    });

    await orderStore.create({
      product_id: 1,
      quantity: 2,
      user_id: 1,
      status: "active",
    });
  });

  afterAll(async () => {
    // Delete the test data from the database after running the tests
    const orders = await orderStore.index();
    const products = await productStore.index();
    const users = await userStore.index();

    new Promise(() => {
      orders.forEach(async (order: Order) => {
        await orderStore.delete((order.id as unknown as Order).toString());
      });
    })
      .then(() => {
        users.forEach(async (user: User) => {
          await userStore.delete((user.id as unknown as User).toString());
        });
      })
      .then(() => {
        products.forEach(async (product: Product) => {
          await productStore.delete(
            (product.id as unknown as Product).toString()
          );
        });
      });
  });

  describe("index method", () => {
    it("should return an array of orders", async () => {
      const orders = await orderStore.index();

      expect(orders).toBeTruthy();
      expect(orders.length).toBeGreaterThan(0);
    });
  });

  describe("show method", () => {
    it("should return a single order", async () => {
      const order = await orderStore.show("1");

      if (order) {
        const result = await orderStore.show(
          (order.id as unknown as Object).toString()
        );

        expect(result.id).toEqual(order.id);
      }
    });

    it("should return a single order based on user id", async () => {
      const user = await userStore.show("1");

      if (user) {
        const userOrder = await orderStore.current(
          (user.id as number).toString()
        );

        expect(userOrder).toBeTruthy();
      }
    });
  });

  describe("show order status", () => {
    it("show return order status 'created'", async () => {
      const order = await orderStore.show("1");

      if (order) {
        expect(order.status).toBe("created");
      }
    });

    it("show return order status 'active'", async () => {
      const order = await orderStore.show("2");

      if (order) {
        expect(order.status).toBe("active");
      }
    });
  });
});
