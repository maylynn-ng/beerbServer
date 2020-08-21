const { Location, User, Beer } = require('../models');

exports.postLocation = async (req, res) => {
  try {
    const newLocation = await Location.create(req.body.location);

    // await Beer.bulkCreate(req.body.beers, { updateOnDuplicate: ['beerId'] }); // only updates if the id matches. Not useful for us

    await req.body.beers.map(async beer => {
      const [searchedBeer] = await Beer.findAll({ where: { beerId: beer.beerId } });
      if (!searchedBeer) {
        await Beer.create(beer);
      }
    });
    const [selectedBeer] = await Beer.findAll({ where: { beerId: req.body.location.beerId } });

    await selectedBeer.setUsers([req.body.location.UserId]);

    res.status(201);
    res.json(newLocation);
  } catch (error) {
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
