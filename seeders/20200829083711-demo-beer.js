'use strict';

const data = require('./db.json');

module.exports = {
  up: async queryInterface => {
    const beers = data.beera.map(beer => ({
      beerId: beer.beerId,
      beerName: beer.beerName,
      beerLabel: beer.beerLabel,
      beerAbv: beer.beerAbv,
      beerIbu: beer.beerIbu,
      beerDescription: beer.beerDescription,
      beerStyle: beer.beerStyle,
      breweryName: beer.breweryName,
      breweryCountry: beer.breweryCountry,
      breweryLabel: beer.breweryLabel,
      breweryUrl: beer.breweryUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert('Beers', beers, {});
  },

  down: async () => {},
};
