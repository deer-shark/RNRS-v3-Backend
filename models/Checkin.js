'use strict'

const {DataTypes} = require("sequelize");

module.exports = async function (fastify, opts) {
  const Checkin = fastify.sequelize.define(
    'Checkin',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      note: {
        type: DataTypes.STRING,
      },
    },
    {
        tableName: 'checkins',
    }
  );
}
