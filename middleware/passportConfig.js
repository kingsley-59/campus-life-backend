const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/userModel");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3030/users/auth/google/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          let existingUser = await User.findOne({ googleId: profile.id });
          // if user exists return the user;
          if (existingUser) {
            return done(null, existingUser);
          }
          // if user does not exist create a new user;
          console.log("Creating new user...");
          const newUser = new User({
            method: "google",
            googleId: profile.id,
            fullname: profile.displayName,
            email: profile.emails[0].value,
            password: null,
          });
          await newUser.save();
          console.log("User created!");
          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.secretKey,
      },
      async (jwtPayload, done) => {
        try {
          // Extract user
          const user = jwtPayload.user;
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
