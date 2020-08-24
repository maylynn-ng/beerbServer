const router = require('express').Router();
const {
  postLocation,
  getLocations,
  getBeers,
  getDrunkBeers,
  searchBeer,
} = require('../controllers');

router.post('/locations', getLocations);
router.post('/location', postLocation);
router.get('/beers', getBeers);
router.post('/drunkbeers', getDrunkBeers);
router.get('/searchBeer/:id', searchBeer);

module.exports = router;
