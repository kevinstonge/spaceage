exports.up = function (knex) {
  return knex.schema.createTable("QueryCache", (queryCache) => {
    queryCache.increments("ID").unsigned();
    queryCache.string("QueryString").unique().notNullable();
    queryCache.json("QueryResult").notNullable();
    queryCache.string("Timestamp").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("QueryCache");
};
