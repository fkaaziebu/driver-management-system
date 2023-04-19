const request = require("supertest");
const app = require("../app");
const Driver = require("../src/models/Driver");
const sequelize = require("../src/config/database");

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return Driver.destroy({ truncate: true });
});

validUser = {
  username: "user1",
  email: "user1@mail.com",
  contact: "0550815604",
  password: "P4ssword",
};

const postUser = (user = validUser) => {
  return request(app).post("/api/1.0/drivers/auth").send(user);
};

describe("Driver Registration", () => {
  it("returns 200 Ok when driver signup request is valid", async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
  });

  it("returns success message when signup request is valid", async () => {
    const response = await postUser();
    expect(response.body.message).toBe("Driver created");
  });

  it("saves the user to database", async () => {
    await postUser();
    const driverList = await Driver.findAll();
    expect(driverList.length).toBe(1);
  });
});
