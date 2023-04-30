import { Order, OrderStore } from "../../models/orders";
import { ProductStore } from "../../models/products";
import { User, UserStore } from "../../models/users";

const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

describe("OrderStore", () => {
  beforeAll(async () => {
    const testOrderProduct = await productStore.create({
      price: 6.5,
      category: "Toy",
      name: "Barbie",
    });

    const testOrderUser = await userStore.create({
      firstName: "john",
      lastName: "doe1",
      password: "udacity-project",
    });

    if (testOrderProduct && testOrderUser) {
      await orderStore.create({
        product_id: testOrderProduct.id as number,
        quantity: 2,
        user_id: testOrderUser.id as number,
        status: "complete",
      });

      await orderStore.create({
        product_id: testOrderProduct.id as number,
        quantity: 5,
        user_id: testOrderUser.id as number,
        status: "active",
      });
    }
  });

  afterAll(async () => {
    await orderStore.dropOrderRecords();
    await productStore.dropProductRecords();
    await userStore.dropUserRecords();
  });

  describe("userOrders method", () => {
    it("should return orders based on user id", async () => {
      const users = await userStore.index();

      if (users.length > 0) {
        // @ts-ignore
        const testUser = users.filter((u) => u.lastname === "doe1");

        if (testUser.length > 0) {
          const userId = testUser[0].id;

          const userOrders: Order[] = await orderStore.userOrders(
            (userId as number).toString(),
            null
          );

          expect(userOrders.length).toBeGreaterThan(0);
        }
      }
    });

    it("should return 'active' orders based on user id", async () => {
      const users = await userStore.index();

      if (users.length > 0) {
        // @ts-ignore
        const testUser = users.filter((u) => u.lastname === "doe1");

        if (testUser.length > 0) {
          const userId = testUser[0].id;

          const userOrders: Order[] = await orderStore.userOrders(
            (userId as number).toString(),
            "active"
          );

          expect(userOrders.length).toBeGreaterThan(0);
        }
      }
    });

    it("should return 'complete' orders based on user id", async () => {
      const users = await userStore.index();

      if (users.length > 0) {
        // @ts-ignore
        const testUser = users.filter((u) => u.lastname === "doe1");

        if (testUser.length > 0) {
          const userId = testUser[0].id;

          const userOrders: Order[] = await orderStore.userOrders(
            (userId as number).toString(),
            "complete"
          );

          expect(userOrders.length).toBeGreaterThan(0);
        }
      }
    });
  });
});
