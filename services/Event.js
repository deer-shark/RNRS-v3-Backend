exports.getAllEvent = fastify => async function (request, reply) {
  const {Event} = fastify.sequelize.models;

  const events = await Event.findAll({
    attributes: ['id', 'code', 'name', 'date', 'location'],
  });

  console.log(JSON.stringify(events, null, 2));
  reply.send(events);
}

exports.getEventDetail = fastify => async function (request, reply) {
  const {Event, EventOrg, EventRole} = fastify.sequelize.models;

  const event = await Event.findOne({
    where: {
      code: request.params.eventCode,
    },
    include: [
      {
        model: EventOrg,
        as: "orgs",
        attributes: ['id', 'value'],
        //required: true,
      },
      {
        model: EventRole,
        as: "roles",
        attributes: ['id', 'value'],
        //required: true,
      },
    ],
  });
  if (!event)
    throw fastify.httpErrors.notFound("Event Not Found");

  console.log(JSON.stringify(event, null, 2));
  reply.send(event);
}

