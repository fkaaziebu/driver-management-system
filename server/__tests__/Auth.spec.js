const request = require("supertest");
const app = require("../src/app");
const Driver = require("../src/driver/Driver");
const sequelize = require("../src/config/database");
const en = require("../locales/en/translation.json");
const bcrypt = require("bcrypt");

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  await Driver.destroy({ truncate: true });
});

const activeUser = {
  username: "user1",
  email: "user1@mail.com",
  contact: "05508155604",
  password: "P4ssword",
  inactive: false,
};

const addUser = async (user = { ...activeUser }) => {
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  return await Driver.create(user);
};

const postAuthentication = async (credentials) => {
  return await request(app).post("/api/1.0/auth").send(credentials);
};

describe("Authentication", () => {
  // Authentication Success scenarios for Driver
  it("returns 200 when credentials are correct", async () => {
    await addUser();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.status).toBe(200);
  });
  it("returns only user id, username and token when login success", async () => {
    const user = await addUser();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.body.id).toBe(user.id);
    expect(response.body.username).toBe(user.username);
    expect(Object.keys(response.body)).toEqual(["id", "username", "token"]);
  });
  it("returns 401 when user does not exist", async () => {
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.status).toBe(401);
  });
  it("returns proper error body when authentication fails", async () => {
    const nowInMillis = new Date().getTime();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    const error = response.body;
    expect(error.path).toBe("/api/1.0/auth");
    expect(error.timestamp).toBeGreaterThan(nowInMillis);
    expect(Object.keys(error)).toEqual(["path", "timestamp", "message"]);
  });
  it("returns a message body when authentication fails", async () => {
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.body.message).toBe(en.authentication_failure);
  });
  it("returns 401 when password is wrong", async () => {
    await addUser();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "Password",
    });
    expect(response.status).toBe(401);
  });
  it("returns 403 when logging in with an inactive account", async () => {
    await addUser({ ...activeUser, inactive: true });
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.status).toBe(403);
  });
  it("returns proper error body when inactive authentication failure", async () => {
    const nowInMillis = new Date().getTime();
    await addUser({ ...activeUser, inactive: true });
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.body.path).toBe("/api/1.0/auth");
    expect(response.body.timestamp).toBeGreaterThan(nowInMillis);
    expect(Object.keys(response.body)).toEqual([
      "path",
      "timestamp",
      "message",
    ]);
  });
  it("returns Account is inactive when authentication fails for inactive account", async () => {
    await addUser({ ...activeUser, inactive: true });
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.body.message).toBe(en.inactive_authentication_failure);
  });
  it("returns 401 when email is not valid", async () => {
    const response = await postAuthentication({
      password: "P4ssword",
    });
    expect(response.status).toBe(401);
  });
  it("returns 401 when password is not valid", async () => {
    const response = await postAuthentication({
      email: "user1@mail.com",
    });
    expect(response.status).toBe(401);
  });
  it("returns token in response body when credentials are correct", async () => {
    await addUser();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.body.token).not.toBeUndefined();
  })
});
