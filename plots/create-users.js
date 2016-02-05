'use strict';

const Plot = require('storyline/bin/plot');

module.exports = class CreateUsers extends Plot {
  get requirements() {
    return ['clear'];
  }

  run(app) {
    return app.db('users').insert([
      {first_name: 'Tony', last_name: 'Stark'},
    ]);
  }
}
