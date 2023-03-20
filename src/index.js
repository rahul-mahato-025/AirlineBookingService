const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const { PORT, DB_SYNC } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const setupAndStartServer = async () => {
  const app = express();

  if (DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

setupAndStartServer();
