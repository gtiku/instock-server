const knex = require("knex")(require("../knexfile"));

const getInventoryItem = (req, res) => {
    knex
        .select("*")
        .from("inventories")
        .where({ id: req.params.id })
        .then((item) => {
            res.json(item[0]);
        })
        .catch((error) => {
            res.status(404).send("Inventory item not found.");
            console.log(error);
        })
    }

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

module.exports = { index, getInventoryItem };