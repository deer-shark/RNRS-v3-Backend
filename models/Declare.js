'use strict'

const {DataTypes} = require("sequelize");

module.exports = async function (fastify, opts) {
  const Declare = fastify.sequelize.define(
    'Declare',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      googleForm: {
        type: DataTypes.JSON,
      },
      hash: {
        type: DataTypes.STRING,
      },
    },
    {
        tableName: 'declares',
    }
  );
}
