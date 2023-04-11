const request = require("supertest");
const app = require("../app");

it("returns 200 Ok when driver signup request is valid", (done) => {
  request(app)
    .post("/api/1.0/users/auth")
    .send({
      username: "user1",
      email: "user1@mail.com",
      password: "P4ssword",
    })
    .then((response) => {
      expect(response.status).toBe(200);
      done();
    });
});
