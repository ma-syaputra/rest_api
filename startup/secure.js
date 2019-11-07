
const helmet = require('helmet')
const rateLimit = require("express-rate-limit")
module.exports = function(app) {
  const limiter = rateLimit({
    windowMs: 10 * 1 * 1000,
    max: 240
  });
  app.use(limiter)
  app.use(helmet())
  app.use(helmet.xssFilter())
  app.use(helmet.frameguard())
};



