const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
