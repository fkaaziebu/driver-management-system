const request = require("supertest");
const app = require("../app");
const Driver = require("../src/models/Driver");
const sequelize = require("../src/config/database");

// Hook that runs before the tests are runned
beforeAll(() => {
  return sequelize.sync();
});

// Hook that runs before each test is runned
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
  /* VALID REQUEST */
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
  it("saves the username, email and contact to database", async () => {
    await postUser();
    const drivers = await Driver.findAll();
    driver = drivers[0];
    expect(driver.username).toBe("user1");
    expect(driver.email).toBe("user1@mail.com");
    expect(driver.contact).toBe("0550815604");
  });
  it("hashes password to database", async () => {
    await postUser();
    const drivers = await Driver.findAll();
    driver = drivers[0];
    expect(driver.password).not.toBe("P4ssword");
  });

  /* INVALID REQUEST */
  it("returns 400 when username is null", async () => {
    const response = await postUser({
      ...validUser,
      username: null,
    });
    expect(response.status).toBe(400);
  });
  it("returns a validationError field in response body when validation error occur", async () => {
    const response = await postUser({
      ...validUser,
      username: null,
    });
    expect(response.body.validationErrors).not.toBeUndefined();
  });
  it("returns Username cannot be null when username is null", async () => {
    const response = await postUser({
      ...validUser,
      username: null,
    });
    expect(response.body.validationErrors.username).toBe(
      "Username cannot be null"
    );
  });
  it("returns Email cannot be null when email is null", async () => {
    const response = await postUser({
      ...validUser,
      email: null,
    });
    expect(response.body.validationErrors.email).toBe(
      "Email cannot be null"
    );
  });
});
