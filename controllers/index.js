const { Location, User, Beer, sequelize } = require('../models');

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
    const [beer] = await Beer.findAll({
      where: { beerId: req.params.id },
      attributes: ['beerId', 'beerName', 'beerLabel'],
    });
    console.log('🌵🌵🌵🌵🌵');
    res.status(200);
    res.json(beer);
  } catch (error) {
    console.info('Looks like our server is drunk... ', error);
  }
};
