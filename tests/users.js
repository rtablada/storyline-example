'use strict';
/* globals it, describe, beforeEach, after, afterEach */

const expect = require('chai').expect;
const Storyline = require('storyline');
const pg = require('knex')(require('../knexfile').development);
const plotLoader = require('../plots/loader');
const app = {db: pg};

const story = new Storyline(app);

const UserGateway = require('../bin/gateways/user');

plotLoader(story);

after(() => {
  pg.destroy();
});

describe('User Gateway', () => {
  let gateway;

  beforeEach((done) => {
    story.run('create-aliases').then(() => {
      gateway = new UserGateway(pg);

      done();
    });
  });

  it('can grab a user by id', (done) => {

    gateway.findById(1).then((user) => {
      expect(user).to.deep.equal({id: 1, first_name: 'Tony', last_name: 'Stark', alias_id: 1});
      done();
    });
  });
});
