exports.up = function (knex) {
  return knex.schema.createTable("QueryCache", (queryCache) => {
    queryCache.increments("ID").primary();
    queryCache.string("QueryString").unique().notNullable();
    queryCache.json("QueryResult").notNullable();
    queryCache.integer("Timestamp").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("QueryCache");
};
