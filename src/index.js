const express = require("express");
const { PORT } = require("./config/serverConfig");

const setupAndStartServer = async () => {
  const app = express();

  app.listen(() => {
    console.log(`Server started at port ${PORT}`);
  });
};

setupAndStartServer();
