const express = require("express");
const BookingController = require("../../controllers/booking-controller");
const { createChannel } = require("../../utils/message-queue");

const router = express.Router();

const bookingController = new BookingController();
router.post("/bookings", bookingController.create);
router.post("/publish", bookingController.sendMsgToQueue);

module.exports = router;
