const TokenService = require("../auth/TokenService");

// This runs anytime a request is sent to any of the routes
const tokenAuthentication = async (req, res, next) => {
  // Check for authorization headers if any
  const authorization = req.headers.authorization;
  // If authorization headers included we proceed
  if (authorization) {
    // Get the token from the header
    const token = authorization.substring(7);
    try {
      // Verify the token
      /**
       * Token verification is by
       * 1. Check if the user has a valid token which is not one week old
       * 2. If verified set a new Date to token so it doesn't expire
       */
      const user = await TokenService.verify(token);
      // If successfully verified, add to the request an authenticated user
      // which comes from the TokenService
      req.authenticatedUser = user;
    } catch (err) {
      // If error occured
      /**
       * Error that could occur include
       * 1. Token older than one week
       * 2. Token not found at all
       */
    }
  }
  next();
};

module.exports = tokenAuthentication;
