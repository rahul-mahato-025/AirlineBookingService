const express = require("express");
const db = require("./models");
const { PORT, DB_SYNC } = require("./config/serverConfig");

const setupAndStartServer = async () => {
  const app = express();

  if (DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }

  app.listen(() => {
    console.log(`Server started at port ${PORT}`);
  });
};

setupAndStartServer();
