const express = require("express");
const db = require("./config/config.js");
const routes = require("./routes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`The Server is running on port ${PORT}!`);
  });
});
