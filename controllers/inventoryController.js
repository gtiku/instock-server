const { v4: uuid } = require("uuid");

const knex = require("knex")(require("../knexfile"));

const getInventoryItem = (req, res) => {
  knex
    .select("inventories.*", "warehouses.warehouse_name")
    .from("inventories")
    .where("inventories.id", "=", req.params.id)
    .join("warehouses", "warehouses.id", "inventories.warehouse_id")
    .then((item) => {
      res.json(item[0]);
    })
    .catch((error) => {
      res.status(404).send("Inventory item not found.");
      console.log(error);
    });
};

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

const postItem = (req, res) => {
  const warehouse_id = req.body.warehouse;
  const item_name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const status = req.body.status;
  const quantity = +req.body.quantity;

  const newItem = {
    id: uuid(),
    warehouse_id: warehouse_id,
    item_name: item_name,
    description: description,
    category: category,
    status: status,
    quantity: quantity,
  };

  knex("inventories")
    .insert(newItem)
    .then(async (newItem) => {
      res.json(newItem);
    })
    .catch((error) => {
      res.status(404).send("POST failed");
    });
};

module.exports = { index, postItem };
