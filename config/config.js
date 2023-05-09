const { connect, connection, set } = require("mongoose");

const connectConfig =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-Network_db";

set("strictQuery", false);
connect(connectConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
