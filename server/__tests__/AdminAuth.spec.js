const request = require("supertest");
const app = require("../src/app");
const Admin = require("../src/admin/Admin");
const AdminToken = require("../src/auth/AdminToken");
const sequelize = require("../src/config/database");
const en = require("../locales/en/translation.json");
const bcrypt = require("bcrypt");

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  await Admin.destroy({ truncate: true });
});

const activeUser = {
  username: "user1",
  email: "user1@mail.com",
  password: "P4ssword",
  contact: "0550815604",
  houseNumber: "K57/1",
  streetName: "Kpanyas",
  city: "Odumase-Krobo",
  country: "Ghana",
  inactive: false,
};

const addUser = async (user = { ...activeUser }) => {
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  return await Admin.create(user);
};

const postAuthentication = async (credentials) => {
  return await request(app).post("/api/1.0/auth/admins").send(credentials);
};

const postLogout = async (options = {}) => {
  const agent = request(app).post("/api/1.0/admins/logout");
  if (options.token) {
    agent.set("Authorization", `Bearer ${options.token}`);
  }
  return agent.send();
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
    expect(error.path).toBe("/api/1.0/auth/admins");
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
    expect(response.body.path).toBe("/api/1.0/auth/admins");
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
  });
});

/* LOGOUT REQUEST FROM USER */
describe("Logut", () => {
  it("returns 200 ok when unauthorized request send for logout", async () => {
    const response = await postLogout();
    expect(response.status).toBe(200);
  });
  it("removes the token from database", async () => {
    await addUser();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    const token = response.body.token;
    await postLogout({ token: token });
    const storedToken = await AdminToken.findOne({ where: { token: token } });
    expect(storedToken).toBeNull();
  });
});

describe("Token Expiration", () => {
  const putUser = async (id = 5, body = null, options = {}) => {
    let agent = request(app);
    agent = request(app).put("/api/1.0/admins/" + id);
    if (options.token) {
      agent.set("Authorization", `Bearer ${options.token}`);
    }
    return agent.send(body);
  };

  it("returns 403 when token is older than 1 week", async () => {
    const savedUser = await addUser();
    const token = "test-token";
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 - 1000);
    await AdminToken.create({
      token: token,
      userId: savedUser.id,
      lastUsedAt: oneWeekAgo,
    });
    const validUpdate = { username: "user1-updated" };
    const response = await putUser(savedUser.id, validUpdate, { token: token });
    expect(response.status).toBe(403);
  });
  it("refreshes lastUsedAt when unexpired token is used for unauthenticated endpoint", async () => {
    const savedUser = await addUser();
    const token = "test-token";
    const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 - 1000);
    await AdminToken.create({
      token,
      userId: savedUser.id,
      lastUsedAt: fourDaysAgo,
    });
    const rightBeforeSendingRequest = new Date();
    await request(app)
      .get("/api/1.0/admins/5")
      .set("Authorization", `Bearer ${token}`);
    const tokenInDB = await AdminToken.findOne({ where: { token: token } });
    expect(tokenInDB.lastUsedAt.getTime()).toBeGreaterThan(
      rightBeforeSendingRequest.getTime()
    );
  });
});
