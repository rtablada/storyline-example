'use strict';

module.exports = class User {
  constructor(connection) {
    this.connection = connection;
  }

  findById(id) {
    return this.connection('users').where({id}).then((users) => {
      return users[0];
    });
  }

  create(params) {
    return this.connection('users').insert(params).returning('*').then((users) => {
      return users[0];
    });
  }
};
