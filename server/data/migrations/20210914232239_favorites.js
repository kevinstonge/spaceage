exports.up = function (knex) {
  return knex.schema
    .createTable("Favorites", (favorites) => {
      favorites.increments("ID").unsigned().notNullable();
      favorites.string("QueryString").notNullable().unique();
    })
    .createTable("User_Favorites", (user_favorites) => {
      user_favorites
        .integer("User_ID")
        .references("ID")
        .inTable("Users")
        .onDelete("CASCADE");
      user_favorites
        .integer("Favorite_ID")
        .references("ID")
        .inTable("Favorites")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("User_Favorites")
    .dropTableIfExists("Favorites");
};
