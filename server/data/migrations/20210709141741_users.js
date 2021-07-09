exports.up = function (knex) {
  return knex.schema.createTable("Users", (users) => {
    users.increments("ID").primary();
    users.string("username").unique().notNullable();
    users.string("password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Users");
};
