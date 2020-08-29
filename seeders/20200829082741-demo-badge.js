'use strict';

const data = require('./db.json');

module.exports = {
  up: async queryInterface => {
    const badges = data.badges.map(badge => ({
      badgeName: badge.badgeName,
      badgeText: badge.badgeText,
      badgeImage: badge.badgeImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert('Badges', badges, {});
  },

  down: async () => {},
};
