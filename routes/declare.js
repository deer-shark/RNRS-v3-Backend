'use strict'

const Declare = require('../services/Declare');

module.exports = async function (fastify, opts) {
  fastify.post('/declare/:eventCode', Declare.newDeclare(fastify));
}
