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
      status: "complete",
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
    await orderStore.dropOrderRecords();
    await productStore.dropOrderRecords();
    await userStore.dropOrderRecords();
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
        const userOrder = await orderStore.userOrders(
          (user.id as number).toString(),
          "complete"
        );

        expect(userOrder).toBeTruthy();
      }
    });
  });

  describe("show order status", () => {
    it("show return order status 'complete'", async () => {
      const order = await orderStore.show("1");

      if (order) {
        expect(order.status).toBe("complete");
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
