const knex = require("knex")(require("../knexfile"));
const warehouses = require('../data/warehouses.json');



const index = (_req, res) => {
    knex
      .select("*")
      .from('warehouses')
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

const addWarehouse = (req, res) =>  {
    console.log(res.body);

    knex("warehouses")
        .insert(req.body)
        .then((warehouse)=> {
            const newWarehouseURL = `/api/v1/warehouses/${warehouse[0]}`;
            res.status(201).location(newWarehouseURL).send(newWarehouseURL);
          })
        .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`))
    
}

module.exports = { index, addWarehouse };

