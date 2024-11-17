const express = require('express');
const { addAppointment } = require('../controllers/appointment');

const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
  const newAppointment = await addAppointment({
    name: req.body.name,
    phone: req.body.phone,
    message: req.body.message,
  });

  res.send({ data: newAppointment });
});

module.exports = router;
