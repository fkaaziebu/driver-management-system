const fs = require("fs");

describe("createFolders", () => {
  it("creates logger file of app.log ones application starts", () => {
    expect(fs.existsSync("app.log")).toBe(true);
  });
  it("checks for logs in app.log", () => {
    console.log(fs.readFileSync("app.log").length);
    expect(fs.readFileSync("app.log").length).toBeGreaterThan(1);
  });
});
