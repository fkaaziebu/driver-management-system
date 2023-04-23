const request = require("supertest");
const app = require("../app");
const Driver = require("../src/models/Driver");
const sequelize = require("../src/config/database");

// RUNS BEFORE ANY TEST
beforeAll(async () => {
  await sequelize.sync();
});

// RUNS BEFORE EACH TEST
beforeEach(async () => {
  await Driver.destroy({ truncate: true });
});

// GETTING SPECIFIC USER
describe("Get User", () => {
  const getUser = (id = 5) => {
    return request(app).get(`/api/1.0/drivers/${id}`);
  };

  it("returns 404 when user not found", async () => {
    const response = await getUser();
    expect(response.status).toBe(404);
  });
  it("returns User Not Found for unkown user", async () => {
    const response = await getUser();
    expect(response.body.message).toBe("User not found");
  });
  it("returns proper error body when user not found", async () => {
    const nowInMillis = new Date().getTime();
    const response = await getUser();
    const error = response.body;
    expect(error.path).toBe("/api/1.0/drivers/5");
    expect(error.timestamp).toBeGreaterThan(nowInMillis);
    expect(Object.keys(error)).toEqual(["path", "timestamp", "message"]);
  });
  it("returns 200 ok when an active user exist", async () => {
    const user = await Driver.create({
      username: "user1",
      email: "user1@mail.com",
      contact: "0550815604",
      password: "P4ssword",
      inactive: false,
    });

    const response = await getUser(user.id);
    expect(response.status).toBe(200);
  });
  it("returns id, username and email in response body when an active user exist", async () => {
    const user = await Driver.create({
      username: "user1",
      email: "user1@mail.com",
      contact: "0550815604",
      password: "P4ssword",
      inactive: false,
    });

    const response = await getUser(user.id);
    expect(Object.keys(response.body)).toEqual(["id", "username", "email"]);
  });
  it("returns 404 when the user is inactive", async () => {
    const user = await Driver.create({
      username: "user1",
      email: "user1@mail.com",
      contact: "0550815604",
      password: "P4ssword",
      inactive: true,
    });

    const response = await getUser(user.id);
    expect(response.status).toBe(404);
  });
});
