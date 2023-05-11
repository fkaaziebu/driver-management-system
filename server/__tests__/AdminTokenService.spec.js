const sequelize = require("../src/config/database");
const AdminToken = require("../src/auth/AdminToken");
const AdminTokenService = require("../src/auth/AdminTokenService");

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  await AdminToken.destroy({ truncate: true });
});

describe("Scheduled Token Cleanup", () => {
  it("clears the expired token with scheduled task", async () => {
    jest.useFakeTimers();
    const token = "test-token";
    const eightDaysAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
    await AdminToken.create({
      token: token,
      lastUsedAt: eightDaysAgo,
    });

    AdminTokenService.scheduleCleanup();
    jest.advanceTimersByTime(60 * 60 * 1000 + 5000)
    const tokenInDB = await AdminToken.findOne({ where: { token: token } });
    expect(tokenInDB).toBeNull();
  });
});
