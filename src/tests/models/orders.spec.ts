import { Order, OrderStore } from "../../models/orders";
import { Product, ProductStore } from "../../models/products";
import { User, UserStore } from "../../models/users";

const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

describe("OrderStore", () => {
  beforeAll(async () => {
    const productOne = await productStore.create({
      price: 6.5,
      category: "Toy",
      name: "Barbie",
    });

    const user = await userStore.create({
      firstName: "john",
      lastName: "doe",
      password: "udacity-project",
    });

    if (productOne && user) {
      await orderStore.create({
        product_id: productOne.id as number,
        quantity: 2,
        user_id: user.id as number,
        status: "complete",
      });

      await orderStore.create({
        product_id: productOne.id as number,
        quantity: 2,
        user_id: user.id as number,
        status: "active",
      });
    }
  });

  afterAll(async () => {
    await orderStore.dropOrderRecords();
    await productStore.dropProductRecords();
    await userStore.dropUserRecords();
  });

  describe("orders show method", () => {
    it("should return a single order", async () => {
      const order: Order = await orderStore.show("1");

      if (order) {
        expect(order).toBeTruthy();
      }
    });

    it("should return a single order based on user id", async () => {
      const user: User = await userStore.show("1");

      if (user) {
        const userOrder: Order = await orderStore.userOrders(
          (user.id as number).toString(),
          "complete"
        );

        expect(userOrder).toBeTruthy();
      }
    });
  });

  describe("order status method", () => {
    it("show return order status 'complete'", async () => {
      const order: Order = await orderStore.userOrders("1", "complete");

      if (order) {
        expect(order.status).toBe("complete");
      }
    });

    it("show return order status 'active'", async () => {
      const order: Order = await orderStore.userOrders("2", "active");

      if (order) {
        expect(order.status).toBe("active");
      }
    });
  });
});
