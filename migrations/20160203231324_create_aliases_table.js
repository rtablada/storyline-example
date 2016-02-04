
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('aliases', (table) => {
    table.increments();
    table.string('name');
    table.integer('user_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('aliases');
};
