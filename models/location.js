import sequelize from './index';

const Location = sequize.define('Locations', {
  placeId: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  boroughId: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  longitude: {
    type: Datatypes.INTERGER,
    allowNull: false,
  },
  latitude: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
});

console.log(Location === sequelize.models.Location);
