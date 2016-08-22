module.exports = {
  getCollection: function(db){
    return db.collection("users");
  },
  add: function(user, db, cb){
    var collection = this.getCollection(db);
    collection.insert(user, cb);
  },
  getById: function(id, db, cb){
    var collection = this.getCollection(db);
    collection.findOne({id: id}, cb);
  }
}
