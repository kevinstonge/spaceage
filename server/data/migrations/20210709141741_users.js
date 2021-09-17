exports.up = function (knex) {
  return knex.schema.createTable("Users", (users) => {
    users.increments("ID").unsigned();
    users.string("Email").unique().notNullable();
    users.string("Password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Users");
};
