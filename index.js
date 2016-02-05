'use strict';

// jscs: disable

const Storyline = require('storyline');
const pg = require('knex')(require('./knexfile').development);
const plotLoader = require('./plots/loader');
const app = {db: pg};

const story = new Storyline(app);

plotLoader(story);

story.run('create-aliases').then(() => {
  pg.transaction(function(trx) {
    return trx.insert({names: 'Spiderman'}).into('aliases');
  }).toString();

  pg.destroy();
});
