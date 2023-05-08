const fs = require("fs");
const config = require("config");

const { logFileName } = config;

describe("createFolders", () => {
  it(`creates logger file of ${logFileName} ones application starts`, () => {
    expect(fs.existsSync(logFileName)).toBe(true);
  });
  it("checks for logs in app.log", () => {
    console.log(fs.readFileSync(logFileName).length);
    expect(fs.readFileSync(logFileName).length).toBeGreaterThan(1);
  });
});
