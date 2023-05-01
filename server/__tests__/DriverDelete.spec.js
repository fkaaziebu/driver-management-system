const request = require("supertest");
const app = require("../src/app");
const Driver = require("../src/driver/Driver");
const Token = require("../src/auth/Token");
const sequelize = require("../src/config/database");
const bcrypt = require("bcrypt");
const en = require("../locales/en/translation.json");

// Before any test runs
beforeAll(async () => {
  await sequelize.sync();
});

// Before each test runs
beforeEach(async () => {
  await Driver.destroy({ truncate: true });
});
const activeUser = {
  username: "user1",
  email: "user1@mail.com",
  contact: "0550815604",
  password: "P4ssword",
  inactive: false,
};
const addUser = async (user = { ...activeUser }) => {
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  return await Driver.create(user);
};

const auth = async (options = {}) => {
  let token;
  if (options.auth) {
    const response = await request(app)
      .post("/api/1.0/auth")
      .send(options.auth);
    token = response.body.token;
  }
  return token;
};

const deleteUser = async (id = 5, options = {}) => {
  let agent = request(app).delete("/api/1.0/drivers/" + id);

  if (options.token) {
    agent.set("Authorization", `Bearer ${options.token}`);
  }
  return await agent.send();
};

describe("Driver Delete", () => {
  // Fail cases
  it("returns forbidden when request sent unauthorized", async () => {
    const response = await deleteUser();
    expect(response.status).toBe(403);
  });
  it("returns proper error body for unauthorized request", async () => {
    const nowInMillis = new Date().getTime();
    const response = await deleteUser();
    expect(response.body.path).toBe("/api/1.0/drivers/5");
    expect(response.body.timestamp).toBeGreaterThan(nowInMillis);
    expect(response.body.message).toBe(en.unauthorized_user_delete);
  });
  it("returns forbidden when delete request is sent with correct credentials but for different user", async () => {
    await addUser();
    const userToBeDeleted = await addUser({
      ...activeUser,
      username: "user2",
      email: "user2@mail.com",
    });
    const token = await auth({
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    const response = await deleteUser(userToBeDeleted.id, { token: token });
    expect(response.status).toBe(403);
  });
  it("returns 403 when token is not valid", async () => {
    const response = await deleteUser(5, { token: "123" });
    expect(response.status).toBe(403);
  });

  // Success cases
  it("returns 200 when valid delete request sent from authorized user", async () => {
    const savedUser = await addUser();
    const token = await auth({
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    const response = await deleteUser(savedUser.id, { token });
    expect(response.status).toBe(200);
  });
  it("deletes user from database when request sent from authorized user", async () => {
    const savedUser = await addUser();
    const token = await auth({
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    await deleteUser(savedUser.id, { token });
    const inDBUser = await Driver.findOne({ where: { id: savedUser.id } });
    expect(inDBUser).toBeNull();
  });

  // Token Deletion
  it("deletes token from database when delete user request sent from authorized user", async () => {
    const savedUser = await addUser();
    const token = await auth({
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    await deleteUser(savedUser.id, { token });

    const tokenInDB = await Token.findOne({ where: { token: token } });
    expect(tokenInDB).toBeNull();
  });
  it("deletes all tokens from database when delete user request sent from authorized user", async () => {
    const savedUser = await addUser();
    const token1 = await auth({
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    const token2 = await auth({
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    await deleteUser(savedUser.id, { token: token1 });

    const tokenInDB = await Token.findOne({ where: { token: token2 } });

    expect(tokenInDB).toBeNull();
  });
});
