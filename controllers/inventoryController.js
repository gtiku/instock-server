const knex = require("knex")(require("../knexfile"));

const index = (_req, res) => {
  knex
    .select("inventories.*", "warehouses.warehouse_name")
    .from("inventories")
    .innerJoin("warehouses", "warehouses.id", "=", "inventories.warehouse_id")
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
