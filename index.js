'use strict';

// jscs: disable

const Storyline = require('storyline');
const Plot = require('storyline/bin/plot');
const pg = require('knex')(require('./knexfile').development);

const app = {db: pg};

const story = new Storyline(app);

class CreateUsers extends Plot {
  run(app) {
    return app.db('users').insert([
      {first_name: 'Tony', last_name: 'Stark'},
    ]);
  }
}

class CreateAliases extends Plot {
  get requirements() {
    return ['create-users'];
  }

  run(app) {
    return app.db('users').where(
      {first_name: 'Tony', last_name: 'Stark'}
    ).select('id').then((users) => {
      const user_id = users[0].id;

      return app.db('aliases').insert({user_id, name: 'Iron Man'});
    });
  }
}

story.addPlot('create-users', CreateUsers);
story.addPlot('create-aliases', CreateAliases);
story.run('create-aliases').then(pg.destroy);
