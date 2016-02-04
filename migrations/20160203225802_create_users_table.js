
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
