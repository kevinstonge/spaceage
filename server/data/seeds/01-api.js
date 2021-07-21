exports.seed = function (knex) {
  return knex("API")
    .del()
    .then(function () {
      return knex("API").insert([
        {
          ID: 1,
          Name: "Agencies",
          URL: "https://ll.thespacedevs.com/2.0.0/agencies",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/agencies",
        },
        {
          ID: 2,
          Name: "Agencies",
          URL: "https://ll.thespacedevs.com/2.0.0/agencies",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/agencies",
        },
        {
          ID: 3,
          Name: "Astronaut",
          URL: "https://ll.thespacedevs.com/2.0.0/astronaut",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/astronaut",
        },
        {
          ID: 4,
          Name: "Config",
          URL: "https://ll.thespacedevs.com/2.0.0/config",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/config",
        },
        {
          ID: 5,
          Name: "Starship",
          URL: "https://ll.thespacedevs.com/2.0.0/dashboard",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/dashboard",
        },
        {
          ID: 6,
          Name: "Docking",
          URL: "https://ll.thespacedevs.com/2.0.0/docking_event",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/docking_event",
        },
        {
          ID: 7,
          Name: "Event",
          URL: "https://ll.thespacedevs.com/2.0.0/event",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/event",
        },
        {
          ID: 8,
          Name: "Expedition",
          URL: "https://ll.thespacedevs.com/2.0.0/expedition",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/expedition",
        },
        {
          ID: 9,
          Name: "Launch",
          URL: "https://ll.thespacedevs.com/2.0.0/launch",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/launch",
        },
        {
          ID: 10,
          Name: "Launcher",
          URL: "https://ll.thespacedevs.com/2.0.0/launcher",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/launcher",
        },
        {
          ID: 11,
          Name: "Location",
          URL: "https://ll.thespacedevs.com/2.0.0/location",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/locatoin",
        },
        {
          ID: 12,
          Name: "Pad",
          URL: "https://ll.thespacedevs.com/2.0.0/pad",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/pad",
        },
        {
          ID: 13,
          Name: "Program",
          URL: "https://ll.thespacedevs.com/2.0.0/program",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/program",
        },
        {
          ID: 14,
          Name: "Spacecraft",
          URL: "https://ll.thespacedevs.com/2.0.0/spacecraft",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/spacecraft",
        },
        {
          ID: 15,
          Name: "Spacestation",
          URL: "https://ll.thespacedevs.com/2.0.0/spacestation",
          DevURL: "https://lldev.thespacedevs.com/2.0.0/spacestation",
        },
      ]);
    });
};
