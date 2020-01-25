exports.up = function(knex) {
  return knex.schema.createTable("countries", (t) => {
    t.increments().index();

    t.string("code", 2)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("countries");
};
