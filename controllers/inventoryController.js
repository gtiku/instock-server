const knex = require("knex")(require("../knexfile"));
const inventory = require("../data/inventories.json");

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


module.exports = { getInventoryItem }