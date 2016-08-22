const express = require("express");
const app = express();
const config = require("./config")[app.settings.env];

// connect to db
require("./db-connect")(app, function(){
  console.log("connected to DB successfully");
});

/*
* Start listening
*/
app.set("port", process.env.PORT || 3030);
app.listen(app.get("port"), function(){
	console.log("Express server listening on port %s", app.get("port"));
});
