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

  if (!item_name) {
    return res
      .status(400)
      .json({ error: true, message: "Provide an item name." });
  }

  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: "Provide an item description." });
  }

  if (!category) {
    return res
      .status(400)
      .json({ error: true, message: "Select an item category." });
  }

  if (status === "In Stock" && quantity === 0) {
    return res.status(400).json({
      error: true,
      message: `Enter the quantity that is housed at this warehouse. If There is no available stock for this item, set the status to "Out of Stock."`,
    });
  }

  if (status === "Out of Stock" && quantity > 0) {
    return res.status(400).json({
      error: true,
      message: `Invalid input. If item is "Out of Stock," quantity should be zero.`,
    });
  }

  if (!warehouse_id) {
    return res.status(400).json({
      error: true,
      message: "Select the warehouse in which the item is or will be stored.",
    });
  }

  const newItem = {
    id: uuid(),
    warehouse_id: warehouse_id,
    item_name: item_name,
    description: description,
    category: category,
    status: status,
    quantity: quantity,
  };
  console.log(newItem);

  knex("inventories")
    .insert(newItem)
    .then((newItem) => {
      res.json(newItem);
    })
    .catch((error) => {
      res.status(404).send("POST failed");
    });
};

const updateItem = (req, res) => {
  const item_id = req.params.id;
  const warehouse_id = req.body.warehouse;
  const item_name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const status = req.body.status;
  const quantity = +req.body.quantity;

  if (!item_name) {
    return res
      .status(400)
      .json({ error: true, message: "Provide an item name." });
  }

  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: "Provide an item description." });
  }

  if (!category) {
    return res
      .status(400)
      .json({ error: true, message: "Select an item category." });
  }

  if (status === "In Stock" && quantity === 0) {
    return res.status(400).json({
      error: true,
      message: `Enter the quantity that is housed at this warehouse. If There is no available stock for this item, set the status to "Out of Stock."`,
    });
  }

  if (status === "Out of Stock" && quantity > 0) {
    return res.status(400).json({
      error: true,
      message: `Invalid input. If item is "Out of Stock," quantity should be zero.`,
    });
  }

  if (!warehouse_id) {
    return res.status(400).json({
      error: true,
      message: "Select the warehouse in which the item is or will be stored.",
    });
  }

  const updatedItem = {
    id: item_id,
    warehouse_id: warehouse_id,
    item_name: item_name,
    description: description,
    category: category,
    status: status,
    quantity: quantity,
  };

  console.log(updatedItem);

  knex("inventories")
    .where("inventories.id", "=", updatedItem.id)
    .update(updatedItem)
    .then((updatedRow) => {
      res.json(updatedRow);
    })
    .catch((error) => {
      res.status(404).send(`This item does not exist. Please add new item.`);
    });
};

const deleteItem = (req, res) => {
  knex
    .select("*")
    .from("inventories")
    .where({ id: req.params.id })
    .delete()
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(404).send("This item does not exist");
    });
};

module.exports = { index, getInventoryItem, postItem, updateItem, deleteItem };
