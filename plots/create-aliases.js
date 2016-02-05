'use strict';

const Plot = require('storyline/bin/plot');

module.exports = class CreateAliases extends Plot {
  get requirements() {
    return ['create-users'];
  }

  run(app) {
    return app.db('aliases')
      .insert({name: 'Iron Man'}).returning('*')
      .then((aliases) => {
        const alias = aliases[0];

        return app.db('users')
          .where({first_name: 'Tony', last_name: 'Stark'})
          .update({alias_id: alias.id});
      });
  }
};
