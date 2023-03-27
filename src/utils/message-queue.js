const amqplib = require("amqplib");
const {
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
  QUEUE_NAME,
} = require("../config/serverConfig");

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    console.log(error);
  }
};

const publishMessage = async (channel, binding_key, msg) => {
  try {
    await channel.assertQueue(QUEUE_NAME);
    channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(msg));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createChannel,
  publishMessage,
};
