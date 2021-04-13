
exports.up = function(knex) {
    return knex.schema.createTable('logs', function(t) {
        t.increments('id').unsigned().primary()
        t.string('appId').notNull();
        t.string('logpath').notNull();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('logs')
};
