const router = require('express').Router();
const { postLocation, getLocations, getBeers, getDrunkBeers } = require('../controllers');

router.post('/locations', getLocations);
router.post('/location', postLocation);
router.get('/beers', getBeers);
router.get('/drunkbeers/:id', getDrunkBeers);

module.exports = router;
