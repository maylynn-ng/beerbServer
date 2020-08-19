const { Location, User } = require('../models');

exports.postLocation = async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(201);
    res.json(newLocation);
  } catch (error) {
    console.info('error creating a new Location: ', error);
    res.sendStatus(500);
  }
};

exports.getLocations = async (req, res) => {
  try {
    const [userInfo] = await User.findAll({ where: { sub: req.body.sub } });
    if (!userInfo) {
      await User.create(req.body);
      res.status(200);
      res.json([]);
    } else {
      const locations = await Location.findAll({ where: { UserId: userInfo.id } });
      res.status(200);
      res.json(locations);
    }
  } catch (error) {
    console.info('error geting locations from DB: ', error);
    res.sendStatus(500);
  }
};
