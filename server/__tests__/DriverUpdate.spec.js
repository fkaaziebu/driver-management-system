const request = require("supertest");
const app = require("../src/app");
const Driver = require("../src/driver/Driver");
const sequelize = require("../src/config/database");
const bcrypt = require("bcrypt");
const en = require("../locales/en/translation.json");
const fs = require("fs");
const path = require("path");
const config = require("config");

const { uploadDir, profileDir } = config;
const profileDirectory = path.join(".", uploadDir, profileDir);

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

const putUser = async (id = 5, body = null, options = {}) => {
  let agent = request(app);

  let token;
  if (options.auth) {
    const response = await agent.post("/api/1.0/auth").send(options.auth);
    token = response.body.token;
  }

  agent = request(app).put("/api/1.0/drivers/" + id);
  if (token) {
    agent.set("Authorization", `Bearer ${token}`);
  }

  if (options.token) {
    agent.set("Authorization", `Bearer ${options.token}`);
  }
  return await agent.send(body);
};

const readFileAsBase64 = () => {
  const filePath = path.join(".", "__tests__", "resources", "test-png.png");
  return fs.readFileSync(filePath, { encoding: "base64" });
};

describe("Driver update", () => {
  // Fail cases
  it("returns forbidden when request sent without basic authorization", async () => {
    const response = await putUser();
    expect(response.status).toBe(403);
  });
  it("returns proper error body for unauthorized request", async () => {
    const nowInMillis = new Date().getTime();
    const response = await putUser();
    expect(response.body.path).toBe("/api/1.0/drivers/5");
    expect(response.body.timestamp).toBeGreaterThan(nowInMillis);
    expect(response.body.message).toBe(en.unauthorized_user_update);
  });
  it("returns forbidden when request sent with incorrect email in basic authorization", async () => {
    await addUser();
    const response = await putUser(5, null, {
      auth: { email: "user2@mail.com", password: "P4ssword" },
    });
    expect(response.status).toBe(403);
  });
  it("returns forbidden when request sent with incorrect password in basic authorization", async () => {
    const user = await addUser();
    const response = await putUser(5, null, {
      auth: { email: "user1@mail.com", password: "Password" },
    });
    expect(response.status).toBe(403);
  });
  it("returns forbidden when updated request is sent with correct credentials but for different user", async () => {
    await addUser();
    const userToBeUpdated = await addUser({
      ...activeUser,
      username: "user2",
      email: "user2@mail.com",
    });
    const response = await putUser(userToBeUpdated.id, null, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    expect(response.status).toBe(403);
  });
  it("returns forbidden when updated request is sent by an inactive user wit correct credentials for its own user", async () => {
    const inactiveUser = await addUser({ ...activeUser, inactive: true });
    const response = await putUser(inactiveUser.id, null, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    expect(response.status).toBe(403);
  });
  // Success cases
  it("returns 200 when valid update request sent from authorized user", async () => {
    const savedUser = await addUser();
    const validUpdate = { username: "user1-updated" };
    const response = await putUser(savedUser.id, validUpdate, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    expect(response.status).toBe(200);
  });
  it("updates username in database when valid update request is sent from user", async () => {
    const savedUser = await addUser();
    const validUpdate = { username: "user1-updated" };
    await putUser(savedUser.id, validUpdate, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    const inDBUser = await Driver.findOne({ where: { id: savedUser.id } });
    expect(inDBUser.username).toBe(validUpdate.username);
  });
  it("returns 403 when token is not valid", async () => {
    const response = await putUser(5, null, { token: "123" });
    expect(response.status).toBe(403);
  });
  it("saves the driver image when update contains image as base64", async () => {
    const filePath = path.join(".", "__tests__", "resources", "test-png.png");
    const fileInBase64 = fs.readFileSync(filePath, { encoding: "base64" });
    const savedUser = await addUser();
    const validUpdate = { username: "user1-updated", image: fileInBase64 };
    await putUser(savedUser.id, validUpdate, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    const inDBUser = await Driver.findOne({ where: { id: savedUser.id } });
    expect(inDBUser.image).toBeTruthy();
  });
  it("returns success body having only id, username, email and image", async () => {
    const fileInBase64 = readFileAsBase64();
    const savedUser = await addUser();
    const validUpdate = { username: "user1-updated", image: fileInBase64 };
    const response = await putUser(savedUser.id, validUpdate, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    expect(Object.keys(response.body)).toEqual([
      "id",
      "username",
      "email",
      "image",
    ]);
  });
  it("saves the driver image to upload folder and stores filename to driver  when update has image", async () => {
    const fileInBase64 = readFileAsBase64();
    const savedUser = await addUser();
    const validUpdate = { username: "user1-updated", image: fileInBase64 };
    await putUser(savedUser.id, validUpdate, {
      auth: { email: "user1@mail.com", password: "P4ssword" },
    });
    const inDBUser = await Driver.findOne({ where: { id: savedUser.id } });
    const profileImagePath = path.join(profileDirectory, inDBUser.image);
    expect(fs.existsSync(profileImagePath)).toBe(true);
  });
});
