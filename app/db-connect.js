const mongodb = require("mongodb");

module.exports = function(app, done){
  const config = require("./config")[app.settings.env];
  mongodb.MongoClient.connect(
    config.DB_URI,
    function(err, db){
      if(err) throw err;
      // attach to app instance
      app.db = db;
      if(typeof done === "function") done()
    }
  )
}
