require("dotenv").config();
// Update with your config settings.

/**
 * 
 */
module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    database: process.env.DB_LOCAL_DBNAME,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
  },
};
