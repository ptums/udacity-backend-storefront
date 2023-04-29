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

  describe("user index method", () => {
    it("should return all users", async () => {
      const users: User[] = await userStore.index();

      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe("user show method", () => {
    it("should return a single user", async () => {
      const users: User[] = await userStore.index();

      if (users.length > 0) {
        const user: User = await userStore.show(
          (users[0].id as unknown as number).toString()
        );

        if (user) {
          expect(user).toBeTruthy();
        }
      }
    });
  });

  describe("user create method", () => {
    it("should create a new user", async () => {
      const createUser: User = await userStore.create({
        firstName: "john",
        lastName: "doe 2",
        password: "udacity-project",
      });

      if (createUser) {
        const getNewUser: User = await userStore.show(
          (createUser.id as unknown as number).toString()
        );
        expect(getNewUser.lastName).toBe("doe 2");
      }
    });
  });
});
