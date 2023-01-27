const knex = require("knex")(require("../knexfile"));

const addWarehouse = (req, res) => {
  console.log(req.body);

  knex("warehouses")
    .insert(req.body)
    .then((warehouse) => {
      const newWarehouseURL = `/api/v1/warehouses/${warehouse[0]}`;
      res.status(201).location(newWarehouseURL).send(newWarehouseURL);
      console.log(newWarehouseURL);
    })
    .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};

const getWarehouse = (req, res) => {
  knex
    .select("*")
    .from("warehouses")
    .where({ id: req.params.id })
    .then((warehouse) => {
      res.json(warehouse[0]);
    })
    .catch((error) => {
      res.status(404).send("Warehouse not found.");
      console.log(error);
    });
};

// GET full list of warehouses

const index = (_req, res) => {
  knex
    .select("*")
    .from("warehouses")
    .then((warehouses) => {
      res.json(warehouses);
    })
    .catch((error) => {
      res.status(400).json({
        error: true,
        message: "Server cannot be reached",
        specific: error,
      });
    });
};

module.exports = { index, getWarehouse, addWarehouse };
