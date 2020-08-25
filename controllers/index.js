const { Location, User, Beer, sequelize, Badge } = require('../models');

exports.postLocation = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const newLocation = await Location.create(req.body.location, { transaction: t });

    // await Beer.bulkCreate(req.body.beers, { updateOnDuplicate: ['beerId'] }); // only updates if the id matches. Not useful for us

    await req.body.beers.map(async beer => {
      const [searchedBeer] = await Beer.findAll({ where: { beerId: beer.beerId }, transaction: t });
      if (!searchedBeer) {
        await Beer.create(beer);
      }
    });
    const [selectedBeer] = await Beer.findAll({
      where: { beerId: req.body.location.beerId },
      transaction: t,
    });

    await selectedBeer.setUsers([req.body.location.UserId], { transaction: t });
    await t.commit();
    res.status(201);
    res.json(newLocation);
  } catch (error) {
    await t.rollback();
    console.info('error creating a new Location: ', error);
    res.sendStatus(500);
  }
};

exports.getLocations = async (req, res) => {
  try {
    const [userInfo] = await User.findAll({
      include: [{ model: Location }],
      where: { sub: req.body.sub },
      order: [['updatedAt', 'ASC']],
    });
    if (!userInfo) {
      const newUser = await User.create(req.body);
      newUser.dataValues['Locations'] = [];
      res.status(200);
      res.json(newUser);
    } else {
      res.status(200);
      res.json(userInfo);
    }
  } catch (error) {
    console.info('error geting locations from DB: ', error);
    res.sendStatus(500);
  }
};

exports.getBeers = async (req, res) => {
  try {
    const beers = await Beer.findAll({
      attributes: ['beerId', 'beerName', 'beerLabel'],
    });
    res.status(200);
    res.json(beers);
  } catch (error) {
    console.info("Couldn't get your beers for ya...", error);
    res.sendStatus(500);
  }
};

exports.getDrunkBeers = async (req, res) => {
  try {
    console.log('new array', req.body);
    const drunkBeers = await Promise.all(
      req.body.map(async id => {
        const [beer] = await Beer.findAll({
          where: { beerId: id },
          attributes: ['beerId', 'beerName', 'beerLabel'],
        });
        return beer;
      })
    );
    res.status(200);
    res.json(drunkBeers);
  } catch (error) {
    console.info('Looks like our server is drunk... ', error);
    res.sendStatus(500);
  }
};

exports.searchBeer = async (req, res) => {
  try {
    const [foundBeer] = await Beer.findAll({
      where: { beerId: req.params.id },
    });
    res.status(200);
    res.json(foundBeer);
  } catch (error) {
    console.info('Wamp wamp... ', error);
    res.sendStatus(500);
  }
};

exports.putNewFavourite = async (req, res) => {
  try {
    const [rowsUpdated, [updatedUser]] = await User.update(
      { favouriteBeers: req.body.favouriteBeers },
      { returning: true, where: { id: req.body.UserId } }
    );
    res.status(200);
    res.json(updatedUser.favouriteBeers);
  } catch (error) {
    console.info('Not today: ', error);
    res.sendStatus(500);
  }
};

exports.inputBadges = async (req, res) => {
  try {
    console.log('INPUT BADGES', req.body);
    const badge = await Badge.create(req.body);
    res.status(201);
    res.json(badge);
  } catch (error) {
    console.info('Cannot add badge', error);
    res.sendStatus(500);
  }
};

exports.getBadges = async (req, res) => {
  try {
    const badges = await Badge.findAll();

    res.status(200);
    res.json(badges);
  } catch (error) {
    console.info('No badges for you, sir: ', error);
    res.sendStatus(500);
  }
};

exports.putNewBadge = async (req, res) => {
  try {
    const [rowsUpdated, [updatedUser]] = await User.update(
      { badges: req.body.badge },
      { returning: true, where: { id: req.body.UserId } }
    );
    res.status(200);
    res.json(updatedUser.badge);
  } catch (error) {
    console.info("I don't think so, buddy: ", error);
    res.sendStatus(500);
  }
};
