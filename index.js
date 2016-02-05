'use strict';

// jscs: disable

const Storyline = require('storyline');
const pg = require('knex')(require('./knexfile').development);

const app = {db: pg};

const story = new Storyline(app);

const Clear = require('./plots/clear');
const CreateUsers = require('./plots/create-users');
const CreateAliases = require('./plots/create-aliases');

story.addPlot('clear', Clear);
story.addPlot('create-users', CreateUsers);
story.addPlot('create-aliases', CreateAliases);
story.run('create-aliases').then(pg.destroy);
