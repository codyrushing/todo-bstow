const paths = require("../paths");

const express = require("express");
const exphbs  = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const staticServer = require("serve-static")(paths.distBase);
const passport = require("passport");

const fs = require("fs");
const path = require("path");

module.exports = function(app, config){

	/*
	* Serve up files in the /public directory statically
	*/
	app.use(paths.distBase, staticServer);

  /*
	* View setup
	*/
	var hbs = exphbs.create({
    defaultLayout: "main",
    extname: ".hbs",
    partialsDir: path.join(paths.views, "partials"), // same as default, I just like to be explicit
    layoutsDir: path.join(paths.views, "layouts") // same as default, I just like to be explicit
	});

	app.engine("hbs", hbs.engine);
	app.set('view engine', 'hbs');

	app.use(cookieParser())

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())

  app.use(session({
		secret: 'say what',
		resave: false,
	  saveUninitialized: true,
		store: new MongoStore({
	    url: config.DB_URI,
	    collection: 'sessions'
	  })
	}));
  app.use(passport.initialize());
  app.use(passport.session());

	require("./google-auth")(app, config);

	require("./routes")(app);

    // global error handler
	app.use(function(err, req, res, next) {
		res.status(500);
		console.log(err);
  	// handle error somehow
  	res.end();
	});

};
