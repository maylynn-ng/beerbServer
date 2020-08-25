const router = require('express').Router();
const {
  postLocation,
  getLocations,
  getBeers,
  getDrunkBeers,
  searchBeer,
  putNewFavourite,
  getRandomBeer,
} = require('../controllers');

router.post('/locations', getLocations);
router.post('/location', postLocation);
router.get('/beers', getBeers);
router.post('/drunkbeers', getDrunkBeers);
router.get('/searchBeer/:id', searchBeer);
router.put('/favourites', putNewFavourite);
router.get('/discover', getRandomBeer);

module.exports = router;
