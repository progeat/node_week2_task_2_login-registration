const express = require('express');
const {
  addAppointment,
  getAppointments,
} = require('../controllers/appointment');
const authenticated = require('../middlewares/authenticated');
const mapAppointment = require('../helpers/mapAppointment');

const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
  const newAppointment = await addAppointment({
    name: req.body.name,
    phone: req.body.phone,
    message: req.body.message,
  });

  res.send({ data: newAppointment });
});

router.get('/', authenticated, async (req, res) => {
  const appointments = await getAppointments();

  res.send({ data: appointments.map(mapAppointment) });
});

module.exports = router;
