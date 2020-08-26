const router = require('express').Router();
const {
  postLocation,
  getLocations,
  getBeers,
  getDrunkBeers,
  searchBeer,
  putNewFavourite,
  getRandomBeer,
  inputBadges,
  getBadges,
  postNewBadge,
} = require('../controllers');

router.post('/locations', getLocations);
router.post('/location', postLocation);
router.get('/beers', getBeers);
router.post('/drunkbeers', getDrunkBeers);
router.get('/searchBeer/:id', searchBeer);
router.put('/favourites', putNewFavourite);
router.get('/discover', getRandomBeer);
router.post('/inputBadges', inputBadges);
router.get('/getBadges', getBadges);
router.post('/awardBadge', postNewBadge);

module.exports = router;
