const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");
const { Booking } = require("../models/index");
const { ValidationError, AppError } = require("../utils/errors/index");

class BookingRepository {
  async create(data) {
    try {
      const response = await Booking.create(data);
      return response;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Booking failed",
        "Unable to book a flight in repository",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);

      if (data.status) {
        booking.status = data.status;
      }

      booking.save();
      return booking;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Failed to update booking information",
        "Unable to update a flight booking in repository",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
