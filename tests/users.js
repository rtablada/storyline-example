/* globals it, describe, beforeEach, after, afterEach */

import { expect } from 'chai';
import Storyline from 'storyline';
import plotLoader from'../plots/loader';
import knex from 'knex';
import {development} from '../knexfile';

const pg = knex(development);
const app = { db: pg };

const story = new Storyline(app);

import UserGateway from '../bin/gateways/user';

plotLoader(story);

after(() => {
  pg.destroy();
});

describe('User Gateway', () => {
  let gateway;
  let transaction;

  before((done) => {
    story.run('create-aliases').then(() => {
      done();
    });
  });

  beforeEach((done) => {
    pg.transaction((trx) => {
      gateway = new UserGateway(trx);
      transaction = trx;

      done();
    }).catch(() => {});
  });

  afterEach((done) => {
    transaction.rollback().then(() => done());
  });

  it('can grab a user by id', (done) => {

    gateway.findById(1).then((user) => {
      expect(user).to.deep.equal({id: 1, first_name: 'Tony', last_name: 'Stark', alias_id: 1});
      done();
    });
  });

  it('can create a user', (done) => {
    let createdUser;

    gateway.create({first_name: 'Peter', last_name: 'Parker'}).then((user) => {
      createdUser = user;

      return transaction('users').where({first_name: 'Peter'});
    }).then(([user]) => {
      expect(user).to.deep.equal(createdUser);
      done();
    });
  });
});
