exports.getAllEvent = fastify => async function (request, reply) {
  const Event = fastify.sequelize.models.Event;

  const events = await Event.findAll({
    attributes: ['id', 'code', 'name', 'date', 'location'],
  });

  console.log(JSON.stringify(events, null, 2));
  reply.send(events);
}

exports.getEventDetail = fastify => async function (request, reply) {
  const Event = fastify.sequelize.models.Event;
  const EventOrg = fastify.sequelize.models.EventOrg;
  const EventRole = fastify.sequelize.models.EventRole;

  const event = await Event.findOne({
    where: {
      code: request.params.eventCode,
    },
    include: [
      {
        model: EventOrg,
        as: "orgs",
        attributes: ['key', 'value'],
        //required: true,
      },
      {
        model: EventRole,
        as: "roles",
        attributes: ['key', 'value'],
        //required: true,
      },
    ],
  });
  if (!event)
    throw fastify.httpErrors.notFound("Event Not Found");

  console.log(JSON.stringify(event, null, 2));
  reply.send(event);
}

