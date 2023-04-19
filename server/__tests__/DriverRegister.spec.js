const request = require("supertest");
const app = require("../app");
const Driver = require("../models/Driver");

describe("Driver Registration", () => {
  it("returns 200 Ok when driver signup request is valid", (done) => {
    request(app)
      .post("/api/1.0/drivers/auth")
      .send({
        username: "user1",
        email: "user1@mail.com",
        contact: "0550815604",
        password: "P4ssword",
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it("returns success message when signup request is valid", (done) => {
    request(app)
      .post("/api/1.0/drivers/auth")
      .send({
        username: "user1",
        email: "user1@mail.com",
        contact: "0550815604",
        password: "P4ssword",
      })
      .then((response) => {
        expect(response.body.message).toBe("Driver created");
        done();
      });
  });

  it("saves the user to database", (done) => {
    request(app)
      .post("/api/1.0/drivers/auth")
      .send({
        username: "user1",
        email: "user1@mail.com",
        contact: "0550815604",
        password: "P4ssword",
      })
      .then((response) => {
        const driversList = Driver.findAll();
        expect(driversList.length).toBe(1);
        done();
      });
  });
});
