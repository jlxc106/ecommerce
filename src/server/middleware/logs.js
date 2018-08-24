// const fs = require('fs');
const mongoose = require('mongoose');

const Log = mongoose.model('Log');

module.exports = app => {
  app.use(async (req, res, next) => {
    const userId = req.user ? req.user.id : undefined;
    var timeStamp = new Date().toString();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    res.on('finish', async () => {
      const log = new Log({
        networkStatus: res.statusCode,
        userId,
        timeStamp,
        method: req.method,
        url: req.url,
        reqHeaders: {
          cookie: req.headers.cookie,
          referer: req.headers.referer,
          'user-agent': req.headers['user-agent']
        },
        ip
      });
      await log.save();
    });
    next();
  });
};
