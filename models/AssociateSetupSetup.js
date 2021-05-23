'use strict'

module.exports = async function (fastify, opts) {
  const {
    Event,
    EventOrg,
    EventRole,
    Declare,
  } = fastify.sequelize.models;

  Event.hasMany(EventOrg, {as: "orgs"});
  Event.hasMany(EventRole, {as: "roles"});
  EventOrg.belongsTo(Event);
  EventRole.belongsTo(Event);

  Event.hasMany(Declare);
  Declare.belongsTo(Event);

  EventOrg.hasOne(Declare);
  EventRole.hasOne(Declare);
  Declare.belongsTo(EventOrg);
  Declare.belongsTo(EventRole);
}
module.exports.autoload = false;