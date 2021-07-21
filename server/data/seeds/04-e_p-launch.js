const bridgeArray = [];
for (let i = 1; i < 4; i++) {
  for (let j = 1; j < 20; j++) {
    bridgeArray.push({ Endpoint_ID: i, Parameter_ID: j });
  }
}
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Endpoints_Parameters")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Endpoints_Parameters").insert(bridgeArray);
    });
};
