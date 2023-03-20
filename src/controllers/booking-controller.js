const { StatusCodes } = require("http-status-codes");
const BookingService = require("../services/booking-service");

const bookingService = new BookingService();

const create = async (req, res) => {
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
};

module.exports = {
  create,
};
