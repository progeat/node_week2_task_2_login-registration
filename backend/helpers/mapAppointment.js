module.exports = function (appointment) {
  return {
    id: appointment.id,
    name: appointment.name,
    phone: appointment.phone,
    message: appointment.message,
    createdAt: appointment.createdAt,
  };
};
