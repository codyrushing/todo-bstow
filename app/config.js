const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = {
  development: {
    DB_URI: `mongodb://${DB_USER}:${DB_PASSWORD}@ds041623.mlab.com:41623/todo-bstow`,
    googleAuth: {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3030/auth/google/callback"
    }
  },
  production: {

  }
};
