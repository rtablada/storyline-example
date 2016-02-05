'use strict';

const Plot = require('storyline/bin/plot');

module.exports = class Clear extends Plot {
  run(app) {
    return Promise.all([
      app.db('users').truncate(),
      app.db('aliases').truncate(),
    ]);
  }
};
