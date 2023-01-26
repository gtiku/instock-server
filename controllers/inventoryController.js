const knex = require("knex")(require("../knexfile"));

const index = (_req, res) => {
  knex
    .select("*")
    .from("inventories")
    .then((inventories) => {
      res.json(inventories);
    })
    .catch((error) => {
      res.status(400).json({
        error: true,
        message: "Server is unable to be reached currently. Please try again. ",
        specific: error,
      });
    });
};

module.exports = { index };
