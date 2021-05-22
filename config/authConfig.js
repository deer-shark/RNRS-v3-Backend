const path = require('path');

module.exports = {
  privateKeyPath: path.join(__dirname, '../key/rs-private.key'),
  publicKeyPath: path.join(__dirname, '../key/rs-public.key'),
  tokenExpiresIn: 3 * 60 * 60,
  authExclude: [
    "POST /auth",
    "POST /declare/:eventId",
    "GET /event",
    "GET /event/:eventCode",
  ],
}