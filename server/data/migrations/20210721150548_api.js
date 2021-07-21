exports.up = function (knex) {
  return knex.schema
    .createTable("API", (api) => {
      api.increments("ID").primary();
      api.string("Name").notNullable();
      api.string("URL").notNullable();
      api.string("DevURL");
    })
    .createTable("Endpoints", (endpoints) => {
      endpoints.increments("ID").primary();
      endpoints.integer("API_ID").unsigned().notNullable();
      endpoints
        .foreign("API_ID")
        .onDelete("CASCADE")
        .references("ID")
        .inTable("API");
      endpoints.string("Name").notNullable();
      endpoints.string("Path").notNullable();
    })
    .createTable("Parameters", (parameters) => {
      parameters.increments("ID").primary();
      parameters.string("Name").notNullable();
      parameters.string("InputType");
    })
    .createTable("Values", (values) => {
      values.increments("ID").primary();
      values.string("value").notNullable();
    })
    .createTable("Paramters_Values", (p_v) => {
      p_v.integer("Parameter_ID").unsigned().notNullable();
      p_v.integer("Value_ID").unsigned().notNullable();
      p_v
        .foreign("Parameter_ID")
        .onDelete("CASCADE")
        .references("ID")
        .inTable("Parameters");
      p_v
        .foreign("Value_ID")
        .onDelete("CASCADE")
        .references("ID")
        .inTable("Values");
    })
    .createTable("Endpoints_Parameters", (e_p) => {
      e_p.integer("Endpoint_ID").unsigned().notNullable();
      e_p.integer("Parameter_ID").unsigned().notNullable();
      e_p
        .foreign("Endpoint_ID")
        .onDelete("CASCADE")
        .references("ID")
        .inTable("Endpoints");
      e_p
        .foreign("Parameter_ID")
        .onDelete("CASCADE")
        .references("ID")
        .inTable("Parameters");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Endpoints_Parameters")
    .dropTableIfExists("Parameters_Values")
    .dropTableIfExists("Values")
    .dropTableIfExists("Parameters")
    .dropTableIfExists("Endpoints")
    .dropTableIfExists("API");
};
