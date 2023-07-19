const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const secretKey = "your-secret-key";

// Configure and initialize Passport
passport.use(
  new JwtStrategy(
    {
      secretOrKey: secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      // You can perform any additional checks or database queries here
      // For example, check if the user exists or if the token is expired

      // In this example, we assume the payload contains the user object
      const user = payload.user;
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);

// Middleware function to authenticate using Passport JWT strategy
function authenticate(req, res, next) {
  passport.authenticate("jwt", { session: false })(req, res, next);
}

// Function to generate an authentication token
function generateToken(user) {
  // Generate and sign the token with the secret key
  const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });

  return token;
}

module.exports = {
  authenticate,
  generateToken,
};
