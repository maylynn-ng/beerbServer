const router = require('express').Router();
const { postLocation, getLocations } = require('../controllers');

router.get('/locations', getLocations);
router.post('/location', postLocation);

module.exports = router;
