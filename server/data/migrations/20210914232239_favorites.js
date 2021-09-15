
exports.up = function(knex) {
  return knex.schema.createTable("Favorites",(favorites) => {
    favorites.increments("ID").notNullable();
    favorites.string("queryString").notNullable().unique();
  })
  .createTable("User_Favorites",(user_favorites)=>{
    user_favorites.integer("User_ID").unsigned();
    user_favorites
      .foreign("User_ID")
      .onDelete("CASCADE")
      .references("ID")
      .inTable("Users");
    user_favorites.integer("Favorite_ID").unsigned();
    user_favorites
      .foreign("Favorite_ID")
      .onDelete("CASCADE")
      .references("ID")
      .inTable("Favorites")
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("User_Favorites")
    .dropTableIfExists("Favorites");
};
