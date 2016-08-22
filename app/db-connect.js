const mongodb = require("mongodb");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = function(app, done){
  mongodb.MongoClient.connect(
    `mongodb://${DB_USER}:${DB_PASSWORD}@ds041623.mlab.com:41623/todo-bstow`,
    function(err, db){
      if(err) throw err;
      // attach to app instance
      app.db = db;
      if(typeof done === "function") done()
    }
  )
}
