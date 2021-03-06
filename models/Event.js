'use strict'

const {DataTypes} = require("sequelize");

module.exports = async function (fastify, opts) {
  const Event = fastify.sequelize.define(
    'Event',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
      },
      organize: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
          get(){
              const date = this.getDataValue('date');
              return date === '1970-01-01' ? '長期活動' : date;
          },
      },
      location: {
        type: DataTypes.STRING,
      },
      googleFormSrc: {
        type: DataTypes.STRING,
      },
      backgroundImage: {
        type: DataTypes.STRING,
      },
    },
      {
          tableName: 'events',
      }
  );
  const EventOrg = fastify.sequelize.define(
    'EventOrg',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'event_orgs',
    }
  );
  const EventRole = fastify.sequelize.define(
    'EventRole',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'event_roles'
    }
  );
    const EventGate = fastify.sequelize.define(
        'EventGate',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            value: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: 'event_gates'
        }
    );
}
