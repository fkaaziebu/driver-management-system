const request = require("supertest");
const app = require("../src/app");
const Admin = require("../src/admin/Admin");
const sequelize = require("../src/config/database");
const en = require("../locales/en/translation.json");
const bcrypt = require("bcrypt");

/* BEFORE ANY TEST IS RUNNED */
beforeAll(async () => {
  await sequelize.sync();
});

/* BEFORE EACH TEST IS RUNNED */
beforeEach(async () => {
  await Admin.destroy({ truncate: { cascade: true } });
});

const postAuthentication = async (credentials) => {
  return await request(app).post("/api/1.0/auth/admins").send(credentials);
};

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

const getUser = async (id = 5, options = {}) => {
  let agent = request(app);

  let token;
  if (options.auth) {
    const response = await agent
      .post("/api/1.0/auth/admins")
      .send(options.auth);
    token = response.body.token;
  }

  agent = request(app).get("/api/1.0/admins/" + id);
  if (token) {
    agent.set("Authorization", `Bearer ${token}`);
  }

  if (options.token) {
    agent.set("Authorization", `Bearer ${options.token}`);
  }
  return await agent.send();
};

/* GETTING SPECIFIC ADMIN */
describe("Get User", () => {
  // Fail cases
  it("returns forbidden when request sent without basic authorization", async () => {
    const response = await getUser();
    expect(response.status).toBe(403);
  });
  it("returns proper error body for unauthorized request", async () => {
    const nowInMillis = new Date().getTime();
    const response = await getUser();
    expect(response.body.path).toBe("/api/1.0/admins/5");
    expect(response.body.timestamp).toBeGreaterThan(nowInMillis);
    expect(response.body.message).toBe(en.unauthorized_user_update);
  });
  it("returns forbidden when request sent with incorrect email in basic authorization", async () => {
    await addUser();
    const response = await getUser(5, {
      auth: { email: "user2@mail.com", password: "P4ssword" },
    });
    expect(response.status).toBe(403);
  });
  it("returns forbidden when request sent with incorrect password in basic authorization", async () => {
    const user = await addUser();
    const response = await getUser(5, {
      auth: { email: "user1@mail.com", password: "Password" },
    });
    expect(response.status).toBe(403);
  });
  it("returns forbidden when request to get user is sent with correct credentials but for different user", async () => {
    await addUser();
    const userToBeUpdated = await addUser({
      ...activeUser,
      username: "user2",
      email: "user2@mail.com",
    });
    const response = await getUser(userToBeUpdated.id, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    expect(response.status).toBe(403);
  });
  it("returns forbidden when get request is sent by an inactive user with correct credentials", async () => {
    const inactiveUser = await addUser({ ...activeUser, inactive: true });
    const response = await getUser(inactiveUser.id, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    expect(response.status).toBe(403);
  });
  // Success cases
  it("returns 200 when get request sent from authorized user", async () => {
    const savedUser = await addUser();
    const response = await getUser(savedUser.id, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    expect(response.status).toBe(200);
  });
  it("returns 403 when token is not valid", async () => {
    const response = await getUser(5, { token: "123" });
    expect(response.status).toBe(403);
  });
  it("returns success body having only id, username, email and image", async () => {
    const savedUser = await addUser();
    const response = await getUser(savedUser.id, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    expect(Object.keys(response.body)).toEqual([
      "id",
      "username",
      "email",
      "image",
    ]);
  });
});
