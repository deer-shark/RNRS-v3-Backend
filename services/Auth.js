const readFileSync = require('fs').readFileSync;
const bcrypt = require('bcryptjs');
const {createSigner, createVerifier} = require('fast-jwt');
const authConfig = require('../config/authConfig')

const privateKey = readFileSync(authConfig.privateKeyPath);
const publicKey = readFileSync(authConfig.publicKeyPath);

const sign = createSigner({
  algorithm: 'RS256',
  key: privateKey,
  expiresIn: authConfig.tokenExpiresIn * 1000,
});
const verify = createVerifier({
  key: publicKey,
  cache: true
});

exports.signJwt = fastify => async function (request, reply) {
  const {User} = fastify.sequelize.models;
  const user = await User.scope("withPassword").findOne({where: {account: request.body.account}});
  if (!user)
    throw fastify.httpErrors.unauthorized("Login failed");
  const isMatch = await bcrypt.compare(request.body.password, user.password);
  if (!isMatch)
    throw fastify.httpErrors.unauthorized("Login failed");
  const {password, ...userOther} = user.dataValues;
  const token = sign({sub: user.id, user: userOther});
  reply.send({
    token_type: "Bearer",
    expires_in: authConfig.tokenExpiresIn,
    access_token: token,
  });
}

exports.verifyJwt = fastify => async function (request, reply) {
  const route = `${request.routerMethod} ${request.routerPath}`;
  if (!authConfig.authExclude.includes(route)) {
    try {
      const payload = verify((request.headers.authorization || '').replace('Bearer ', ''))
      request.user = await fastify.sequelize.models.User.findByPk(payload.sub);
    } catch (err) {
      throw fastify.httpErrors.unauthorized(err.code);
      //reply.send(err);
    }
  }
}

exports.me = fastify => async function (request, reply) {
  reply.send(request.user);
}
