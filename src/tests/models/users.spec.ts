import { User, UserStore } from "../../models/users";

const userStore = new UserStore();

describe("UserStore", () => {
  beforeAll(async () => {
    await userStore.create({
      firstName: "john",
      lastName: "doe",
      password: "udacity-project",
    });
  });

  afterAll(async () => {
    await userStore.dropOrderRecords();
  });

  describe("user show method", () => {
    it("should return a single user", async () => {
      const user: User = await userStore.show("1");

      if (user) {
        expect(user).toBeTruthy();
      }
    });

    it("should return all users", async () => {
      const users: User[] = await userStore.index();

      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe("user create method", () => {
    it("should create a new user", async () => {
      const createUser = await userStore.create({
        firstName: "john",
        lastName: "doe 2",
        password: "udacity-project",
      });

      if (createUser) {
        const getNewUser = await userStore.show("2");
        expect(getNewUser.lastName).toBe("doe 2");
      }
    });
  });
});
