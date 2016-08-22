const path = require("path");

var distBase = path.join(__dirname, "public");

module.exports = {
  distBase: distBase,
  views: path.join(__dirname, "views"),
  src: {
    app: path.join(distBase, "src", "app")
  },
  dist: {
    js: path.join(distBase, "js")
  }
};
