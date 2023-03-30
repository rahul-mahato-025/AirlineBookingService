const axios = require("axios");
const {
  FLIGHT_SERVICE_URL,
  AUTH_SERVICE_URL,
  REMINDER_BINDING_KEY,
} = require("../config/serverConfig");
const BookingRepository = require("../repositories/booking-repository");
const { ServiceError, ValidationError } = require("../utils/errors");
const { publishMessage } = require("../utils/message-queue");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async create(data, channel) {
    try {
      // Fetch flight details
      const flightId = data.flightId;
      const getFlightDetailsURL = `${FLIGHT_SERVICE_URL}/api/v1/flights/${flightId}`;
      const flight = await axios.get(getFlightDetailsURL);
      const flightData = flight.data.data;

      // Fetch the user
      const getUserURL = `${AUTH_SERVICE_URL}/api/v1/users/${data.userId}`;
      const user = await axios.get(getUserURL);
      const userData = user.data.data;

      //   book the flight
      const bookingObj = {
        ...data,
        totalCost: data.numSeats * flightData.price,
      };
      const booking = await this.bookingRepository.create(bookingObj);

      // Update total seats
      const flightUpdateURL = `${FLIGHT_SERVICE_URL}/api/v1/flights/${flightId}`;
      await axios.patch(flightUpdateURL, {
        totalSeats: flightData.totalSeats - data.numSeats,
      });

      // update booking status
      await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });

      // publish message to the broker
      const msgObj = {
        data: {
          subject: "Flight Booking",
          recipient: userData.email,
          content: `Your flight from ${
            flightData.departureAirport.City.name
          } to ${flightData.arrivalAirport.City.name} scheduled on ${new Date(
            flightData.departureTime
          ).toLocaleString()} is booked successfully`,
          notificationTime: new Date(),
        },
        service: "CREATE_TICKET",
      };
      await publishMessage(channel, REMINDER_BINDING_KEY, msgObj);

      return booking;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookingService;
