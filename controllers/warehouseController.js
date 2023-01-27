const knex = require("knex")(require("../knexfile"));

const addWarehouse = (req, res) => {
  knex("warehouses")
    .insert(req.body)
    .then((warehouse) => {
      const newWarehouseURL = `/api/v1/warehouses/${warehouse[0]}`;
      res.status(201).location(newWarehouseURL).send(newWarehouseURL);
      console.log(newWarehouseURL);
    })
    .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
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

const deleteWarehouse = (req, res) => {
  knex("warehouses")
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res
        .status(204)
        .send(`${req.params.warehouse_name} warehouse has been deleted.`);
    })
    .catch((error) => {
      res.status(400).send(`Error deleting ${req.params.warehouse_id}`);
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

//GET individual warehouse inventory list

const getWarehouseInventory = (req, res) => {
  knex
    .select("*")
    .from("inventories")
    .where("warehouse_id", "=", req.params.id)
    // .join("warehouses", "warehouses.id", "inventories.warehouse_id")
    .then((inventories) => {
      res.json(inventories);
    })
    .catch((error) => {
      res.status(404).send("No inventory found at this location.");
      console.log(error);
    });
};

module.exports = {
  index,
  getWarehouse,
  addWarehouse,
  deleteWarehouse,
  getWarehouseInventory,
};
