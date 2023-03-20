const axios = require("axios");
const { FLIGHT_SERVICE_URL } = require("../config/serverConfig");
const BookingRepository = require("../repositories/booking-repository");
const { ServiceError, ValidationError } = require("../utils/errors");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async create(data) {
    try {
      // Fetch flight details
      const flightId = data.flightId;
      const getFlightDetailsURL = `${FLIGHT_SERVICE_URL}/api/v1/flights/${flightId}`;
      const flight = await axios.get(getFlightDetailsURL);
      const flightData = flight.data.data;

      //   book the flight
      const bookingObj = {
        ...data,
        totalCost: data.numSeats * flightData.price,
      };
      const booking = await this.bookingRepository.create(bookingObj);

      // Update total seats
      const flightUpdateURL = `${FLIGHT_SERVICE_URL}/api/v1/flights/${flightId}`;
      await axios.patch(flightUpdateURL, {
        numSeats: data.numSeats,
      });

      // update booking status
      const updatedBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });
      return updatedBooking;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookingService;
