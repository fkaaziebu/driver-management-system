const { randomString } = require("../shared/generator");
const Token = require("../auth/Token");
const Sequelize = require("sequelize");
const ONE_WEEK_IN_MILLIS = 7 * 24 * 60 * 60 * 1000;

const createToken = async (user) => {
  // Create random token with 32 hex characters
  const token = randomString(32);
  // Add this token to Token table with the created token,
  // the user id who logged in and the date for the creation
  // So in future we could check for token expiration
  await Token.create({
    token: token,
    userId: user.id,
    lastUsedAt: new Date(),
  });
  return token;
};

const verify = async (token) => {
  const oneWeekAgo = new Date(Date.now() - ONE_WEEK_IN_MILLIS);
  // Check for token's less than one week old
  const tokenInDB = await Token.findOne({
    where: {
      token: token,
      lastUsedAt: {
        [Sequelize.Op.gt]: oneWeekAgo,
      },
    },
  });
  // Reset the token lastUsedAt field and save
  tokenInDB.lastUsedAt = new Date();
  await tokenInDB.save();
  // Get the Id of token which is the Id of the user
  const userId = tokenInDB.userId;
  // Send Id to where this function was called
  return { id: userId };
};

const deleteToken = async (token) => {
  // Get token with this token value in Token table and delete it
  await Token.destroy({ where: { token: token } });
};

const scheduleCleanup = () => {
  setInterval(async () => {
    const oneWeekAgo = new Date(Date.now() - ONE_WEEK_IN_MILLIS);
    await Token.destroy({
      where: {
        lastUsedAt: {
          [Sequelize.Op.lt]: oneWeekAgo,
        },
      },
    });
  }, 60 * 60 * 1000);
};

module.exports = { createToken, verify, deleteToken, scheduleCleanup };
