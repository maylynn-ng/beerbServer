const sequelize = new Sequelize(process.env.PG_URI, {
  protocol: 'postgres',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
});
