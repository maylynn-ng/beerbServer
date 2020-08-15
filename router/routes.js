const router = require('express').Router();
const { getLocations, postLocation } = require('../controllers/controllers');

router.get('/', () => getLocations());
router.post('/', () => postLocation());

module.exports = router;
