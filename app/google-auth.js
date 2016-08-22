const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("./models/User");

module.exports = function(app, config){
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    // get user by ID
    User.getById(id, app.db, done);
  });

  passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {

      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {

          // try to find the user based on their google id
          User.getById(profile.id, app.db, function(err, user) {
              if (err)
                return done(err);
              if (user) {
                // if a user is found, log them in
                console.log("user found");
                console.log(user);
                return done(null, user);
              } else {
                  // if the user isnt in our database, create a new user
                  var newUser = {
                    id: profile.id,
                    google: {
                      token: token,
                      name: profile.displayName,
                      email: profile.emails[0].value
                    }
                  };

                  // save the user
                  User.add(newUser, app.db, function(err, doc) {
                    if (err) throw err;
                    console.log(doc);
                    return done(null, doc);
                  });
              }
          });
      });

  }));

};
