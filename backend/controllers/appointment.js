const chalk = require('chalk');
const Appointment = require('../models/Appointment');

// add
const addAppointment = async (appointment) => {
  const newAppointment = await Appointment.create(appointment);

  console.log(chalk.bgBlue('Appointment was added!'));

  return newAppointment;
};

// get
const getAppointments = () => Appointment.find();

module.exports = {
  addAppointment,
  getAppointments,
};
