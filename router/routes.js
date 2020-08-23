const router = require('express').Router();
const { postLocation, getLocations, getBeers, getDrunkBeers } = require('../controllers');

router.post('/locations', getLocations);
router.post('/location', postLocation);
router.get('/beers', getBeers);
router.post('/drunkbeers', getDrunkBeers);

module.exports = router;
