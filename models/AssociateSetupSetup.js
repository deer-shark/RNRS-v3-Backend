'use strict'

module.exports = async function (fastify, opts) {
  const {
    User,
    Event,
    EventOrg,
    EventRole,
    EventGate,
    Declare,
    Checkin,
  } = fastify.sequelize.models;

  Event.hasMany(EventOrg, {as: "orgs"});
  Event.hasMany(EventRole, {as: "roles"});
  Event.hasMany(EventGate, {as: "gates"});
  EventOrg.belongsTo(Event);
  EventRole.belongsTo(Event);
  EventGate.belongsTo(Event);

  Event.hasMany(Declare);
  EventOrg.hasMany(Declare);
  EventRole.hasMany(Declare);
  Declare.belongsTo(Event);
  Declare.belongsTo(EventOrg);
  Declare.belongsTo(EventRole);

  Declare.hasMany(Checkin);
  EventGate.hasMany(Checkin);
  User.hasMany(Checkin, {foreignKey: 'OperatorId'});
  Checkin.belongsTo(Declare);
  Checkin.belongsTo(EventGate);
  Checkin.belongsTo(User, {foreignKey: 'OperatorId'});

}
module.exports.autoload = false;