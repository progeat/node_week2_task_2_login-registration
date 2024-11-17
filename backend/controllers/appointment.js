const Appointment = require('../models/Appointment');

// add
const addAppointment = async (appointment) => {
  const newAppointment = await Appointment.create(appointment);

  console.log('Appointment was added!');

  return newAppointment;
};

module.exports = {
  addAppointment,
};
