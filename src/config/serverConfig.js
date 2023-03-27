const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_SYNC: process.env.DB_SYNC,
  FLIGHT_SERVICE_URL: process.env.FLIGHT_SERVICE_URL,
  MESSAGE_BROKER_URL: process.env.MESSSAGE_BROKER_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
  QUEUE_NAME: process.env.QUEUE_NAME,
};
