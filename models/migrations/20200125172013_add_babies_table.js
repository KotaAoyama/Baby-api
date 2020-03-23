exports.up = function(knex) {
  return knex.schema.createTable("babies", (t) => {
    t.increments().index();
    t.string("baby_name", 100).notNullable();
    t.string("country_code", 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("babies");
};
