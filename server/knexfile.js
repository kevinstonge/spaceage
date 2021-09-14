require("dotenv").config();
module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./data/spaceage.db3" },
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  },
  test: {
    client: "sqlite3",
    connection: { filename: "./data/spaceageTest.db3" },
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  },
  production: {
    client: "pg",
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_DB}`,
    ssl: { rejectUnauthorized: false },
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
  },
};
