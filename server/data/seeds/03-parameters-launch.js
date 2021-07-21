exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Parameters")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Parameters").insert([
        { ID: 1, Name: "name", InputType: "string" },
        { ID: 2, Name: "slug", InputType: "string" },
        { ID: 3, Name: "rocket__configuration__name", InputType: "string" },
        { ID: 4, Name: "rocket__configuration__id", InputType: "string" },
        { ID: 5, Name: "status", InputType: "string" },
        {
          ID: 6,
          Name: "rocket__spacecraftflight__spacecraft__name",
          InputType: "string",
        },
        {
          ID: 7,
          Name: "rocket__spacecraftflight__spacecraft__name__icontains",
          InputType: "string",
        },
        {
          ID: 8,
          Name: "rocket__spacecraftflight__spacecraft__id",
          InputType: "string",
        },
        {
          ID: 9,
          Name: "rocket__configuration__manufacturer__name",
          InputType: "string",
        },
        {
          ID: 10,
          Name: "rocket__configuration__manufacturer__name__icontains",
          InputType: "string",
        },
        {
          ID: 11,
          Name: "rocket__configuration__full_name",
          InputType: "string",
        },
        {
          ID: 12,
          Name: "rocket__configuration__full_name__icontains",
          InputType: "string",
        },
        {
          ID: 13,
          Name: "mission__orbit__name",
          InputType: "string",
        },
        {
          ID: 14,
          Name: "mission__orbit__name__icontains",
          InputType: "string",
        },
        {
          ID: 15,
          Name: "net__gt",
          InputType: "string",
        },
        {
          ID: 16,
          Name: "net__lt",
          InputType: "string",
        },
        {
          ID: 17,
          Name: "net__gte",
          InputType: "string",
        },
        {
          ID: 18,
          Name: "net__lte",
          InputType: "string",
        },
        {
          ID: 19,
          Name: "search",
          InputType: "string",
        },
      ]);
    });
};
