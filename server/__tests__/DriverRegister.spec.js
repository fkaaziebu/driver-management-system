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
    const body = response.body;
    expect(body.validationErrors).not.toBeUndefined();
  });
  it("returns errors for both when username and email is null", async () => {
    const response = await postUser({
      ...validUser,
      username: null,
      email: null,
    });
    expect(Object.keys(response.body.validationErrors)).toEqual([
      "username",
      "email",
    ]);
  });

  //Dynamic test for similar test
  it.each`
    field         | value              | expectedMessage
    ${"username"} | ${null}            | ${"Username cannot be null"}
    ${"email"}    | ${null}            | ${"Email cannot be null"}
    ${"contact"}  | ${null}            | ${"Contact cannot be null"}
    ${"password"} | ${null}            | ${"Password cannot be null"}
    ${"username"} | ${"usr"}           | ${"Must have min 4 and max 32 characters"}
    ${"username"} | ${"a".repeat(33)}  | ${"Must have min 4 and max 32 characters"}
    ${"email"}    | ${"mail.com"}      | ${"Email is not valid"}
    ${"email"}    | ${"user.mail.com"} | ${"Email is not valid"}
    ${"email"}    | ${"user@mail"}     | ${"Email is not valid"}
    ${"contact"}  | ${"055"}           | ${"Must be equal to 10 characters"}
    ${"contact"}  | ${"05508156041"}   | ${"Must be equal to 10 characters"}
    ${"password"} | ${"P4ssw"}         | ${"Password must be atleast 6 characters"}
    ${"password"} | ${"alllowercase"}  | ${"Password must have at least 1 uppercase, 1 lowercase letter and 1 number"}
    ${"password"} | ${"ALLUPPERCASE"}  | ${"Password must have at least 1 uppercase, 1 lowercase letter and 1 number"}
    ${"password"} | ${"1234567890"}    | ${"Password must have at least 1 uppercase, 1 lowercase letter and 1 number"}
    ${"password"} | ${"lowerandUPPER"} | ${"Password must have at least 1 uppercase, 1 lowercase letter and 1 number"}
    ${"password"} | ${"lower4nd5667"}  | ${"Password must have at least 1 uppercase, 1 lowercase letter and 1 number"}
    ${"password"} | ${"UPPER44444"}    | ${"Password must have at least 1 uppercase, 1 lowercase letter and 1 number"}
  `(
    "returns $expectedMessage when $field is $value",
    async ({ field, expectedMessage, value }) => {
      const user = {
        username: "user1",
        email: "user1@mail.com",
        contact: "0550815604",
        password: "P4ssword",
      };
      user[field] = value;
      const response = await postUser(user);
      const body = response.body;
      expect(body.validationErrors[field]).toBe(expectedMessage);
    }
  );
  it("returns Email in use when same email is already in use", async () => {
    await Driver.create({ ...validUser });
    const response = await postUser();
    expect(response.body.validationErrors.email).toBe("Email in use");
  });
  it("returns errors for both username is null and email in use", async () => {
    await Driver.create({ ...validUser });
    const response = await postUser({
      username: null,
      email: validUser.email,
      contact: "0550815604",
      password: "P4ssword",
    });

    const body = response.body;
    expect(Object.keys(body.validationErrors)).toEqual(["username", "email"]);
  });
  it("returns errors for username is null, email in use and contact is null", async () => {
    await Driver.create({ ...validUser });
    const response = await postUser({
      username: null,
      email: validUser.email,
      contact: null,
      password: "P4ssword",
    });

    const body = response.body;
    expect(Object.keys(body.validationErrors)).toEqual([
      "username",
      "email",
      "contact",
    ]);
  });
});
