exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Endpoints")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Endpoints").insert([
        { ID: 1, API_ID: 8, Name: "launch list", Path: "/" },
        { ID: 2, API_ID: 8, Name: "previous launches list", Path: "/previous" },
        { ID: 3, API_ID: 8, Name: "upcoming launches list", Path: "/upcoming" },
        { ID: 4, API_ID: 8, Name: "launch by id", Path: "/:id" },
      ]);
    });
};
