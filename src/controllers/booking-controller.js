const { StatusCodes } = require("http-status-codes");
const BookingService = require("../services/booking-service");
const { createChannel, publishMessage } = require("../utils/message-queue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {
  async sendMsgToQueue(req, res) {
    try {
      const channel = await createChannel();
      await publishMessage(channel, REMINDER_BINDING_KEY, "This is a test msg");
      return res.status(StatusCodes.OK).json({
        data: {},
        success: true,
        message: "Message sent successfully",
        error: {},
      });
    } catch (error) {
      return res.status(500).json({
        data: {},
        success: true,
        message: "Something went wrong while sending message",
        error: error,
      });
    }
  }

  async create(req, res) {
    try {
      const booking = await bookingService.create(req.body);
      return res.status(StatusCodes.OK).json({
        data: booking,
        success: true,
        message: "Booking done successfully",
        error: {},
      });
    } catch (error) {
      console.log(("Error -> ", error));
      return res.status(error.statusCode).json({
        data: {},
        success: true,
        message: "Something went wrong while booking flight",
        error: error.description,
      });
    }
  }
}

module.exports = BookingController;
