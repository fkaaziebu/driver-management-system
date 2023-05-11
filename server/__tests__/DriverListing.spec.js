const request = require("supertest");
const app = require("../src/app");
const Driver = require("../src/driver/Driver");
const sequelize = require("../src/config/database");
const en = require("../locales/en/translation.json");
const bcrypt = require("bcrypt");

/* BEFORE ANY TEST IS RUNNED */
beforeAll(async () => {
  await sequelize.sync();
});

/* BEFORE EACH TEST IS RUNNED */
beforeEach(async () => {
  await Driver.destroy({ truncate: { cascade: true } });
});

const getDrivers = (options = {}) => {
  return request(app).get("/api/1.0/drivers");
};

const addDrivers = async (activeUserCount, inactiveUserCount = 0) => {
  const hash = await bcrypt.hash("P4ssword", 10);
  for (let i = 0; i < activeUserCount + inactiveUserCount; i++) {
    await Driver.create({
      username: `user${i + 1}`,
      email: `user${i + 1}@mail.com`,
      contact: "0550815604",
      password: hash,
      inactive: i >= activeUserCount,
    });
  }
};

/* LISTING USERS FROM DATABASE */
describe("Listing Users", () => {
  it("returns 200 ok when there are no driver in database", async () => {
    const response = await getDrivers();
    expect(response.status).toBe(200);
  });
  it("returns page object as response body", async () => {
    const response = await getDrivers();
    expect(response.body).toEqual({
      content: [],
      page: 0,
      size: 10,
      totalPages: 0,
    });
  });
  it("returns 10 users in page content when there are 11 users in database", async () => {
    await addDrivers(11);
    const response = await getDrivers();
    expect(response.body.content.length).toBe(10);
  });
  it("returns 6 users in page content when there are active 6 users and inactive 5 users in database", async () => {
    await addDrivers(6, 5);
    const response = await getDrivers();
    expect(response.body.content.length).toBe(6);
  });
  it("returns only id, username, email and image in content array for each driver", async () => {
    await addDrivers(11);
    const response = await getDrivers();
    const driver = response.body.content[0];
    expect(Object.keys(driver)).toEqual(["id", "username", "email", "image"]);
  });
  it("returns to 2 as total pages when there are 15 active and 7 inactive drivers", async () => {
    await addDrivers(15, 7);
    const response = await getDrivers();
    expect(response.body.totalPages).toBe(2);
  });
  it("returns second page drivers and page indicator when page is set as 1 in request parameter", async () => {
    await addDrivers(11);
    const response = await getDrivers().query({ page: 1 });
    expect(response.body.content[0].username).toBe("user11");
    expect(response.body.page).toBe(1);
  });
  it("returns first page when page is set below zero as a request parameter", async () => {
    await addDrivers(11);
    const response = await getDrivers().query({ page: -5 });
    expect(response.body.page).toBe(0);
  });
  it("returns 5 drivers and corresponding indicator when size is set as 5 parameter", async () => {
    await addDrivers(11);
    const response = await getDrivers().query({ size: 5 });
    expect(response.body.content.length).toBe(5);
    expect(response.body.size).toBe(5);
  });
  it("returns 10 drivers and corresponging size indicator when size is set as 1000", async () => {
    await addDrivers(11);
    const response = await getDrivers().query({ size: 1000 });
    expect(response.body.content.length).toBe(10);
    expect(response.body.size).toBe(10);
  });
  it("returns 10 users and corresponging size indicator when size is set as 0", async () => {
    await addDrivers(11);
    const response = await getDrivers().query({ size: 0 });
    expect(response.body.content.length).toBe(10);
    expect(response.body.size).toBe(10);
  });
  it("returns page as zero and size as 10 when non numeric query params providede for both", async () => {
    await addDrivers(11);
    const response = await getDrivers().query({ size: "size", page: "page" });
    expect(response.body.size).toBe(10);
    expect(response.body.page).toBe(0);
  });
});

/* GETTING SPECIFIC DRIVER */
describe("Get User", () => {
  const getDriver = (id = 5) => {
    return request(app).get(`/api/1.0/drivers/${id}`);
  };
  it("returns 404 when user not found", async () => {
    const response = await getDriver();
    expect(response.status).toBe(404);
  });
  it(`returns ${en.user_not_found} for unkown driver`, async () => {
    const response = await getDriver();
    expect(response.body.message).toBe(en.user_not_found);
  });
  it("returns proper error body when driver not found", async () => {
    const nowInMillis = new Date().getTime();
    const response = await getDriver();
    const error = response.body;
    expect(error.path).toBe("/api/1.0/drivers/5");
    expect(error.timestamp).toBeGreaterThan(nowInMillis);
    expect(Object.keys(error)).toEqual(["path", "timestamp", "message"]);
  });
  it("returns 200 ok when an active user exist", async () => {
    const driver = await Driver.create({
      username: "user1",
      email: "user1@mail.com",
      password: "P4ssword",
      inactive: false,
    });

    const response = await getDriver(driver.id);
    expect(response.status).toBe(200);
  });
  it("returns id, username, email and image in response body when an active user exist", async () => {
    const driver = await Driver.create({
      username: "user1",
      email: "user1@mail.com",
      contact: "0550815604",
      password: "P4ssword",
      inactive: false,
    });

    const response = await getDriver(driver.id);
    expect(Object.keys(response.body)).toEqual([
      "id",
      "username",
      "email",
      "image",
    ]);
  });
  it("returns 404 when the driver is inactive", async () => {
    const driver = await Driver.create({
      username: "user1",
      email: "user1@mail.com",
      contact: "0550815604",
      password: "P4ssword",
      inactive: true,
    });

    const response = await getDriver(driver.id);
    expect(response.status).toBe(404);
  });
});
