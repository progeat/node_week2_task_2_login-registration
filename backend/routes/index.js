const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/appointments', require('./appointment'));

module.exports = router;
