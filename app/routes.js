const passport = require("passport");
const User = require("./models/User");

module.exports = function(app){  
  var isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/");
  };

  app.get("/", function(req, res){
    if(req.isAuthenticated()){
      res.redirect("/todos");
    } else {
      res.render("home.hbs", {
        user: req.user
      });
    }
	});

  app.get("/todos", isLoggedIn, function(req, res){
    res.render("todos.hbs", {
      user: req.user
    });
  });

  app.get("/signup", function(req, res) {
    res.redirect("/auth/google");
  });

  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect : '/todos',
      failureRedirect : '/fail'
    })
  );
}
