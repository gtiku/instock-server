const knex = require("knex")(require("../knexfile"));

const getWarehouse = (req, res) => {
    knex
        .select("*")
        .from("warehouses")
        .where({ id: req.params.id })
        .then((warehouse) => {
            res.json(warehouse[0]);
        })
        .catch((error) => {
            res.status(404).send("Warehouse not found.")
            console.log(error);
        })
};

module.exports = { getWarehouse };