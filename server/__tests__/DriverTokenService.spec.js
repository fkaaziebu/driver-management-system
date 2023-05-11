const sequelize = require("../src/config/database");
const DriverToken = require("../src/auth/DriverToken");
const DriverTokenService = require("../src/auth/DriverTokenService");

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  await DriverToken.destroy({ truncate: true });
});

describe("Scheduled Token Cleanup", () => {
  it("clears the expired token with scheduled task", async () => {
    jest.useFakeTimers();
    const token = "test-token";
    const eightDaysAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
    await DriverToken.create({
      token: token,
      lastUsedAt: eightDaysAgo,
    });

    DriverTokenService.scheduleCleanup();
    jest.advanceTimersByTime(60 * 60 * 1000 + 5000)
    const tokenInDB = await DriverToken.findOne({ where: { token: token } });
    expect(tokenInDB).toBeNull();
  });
});
