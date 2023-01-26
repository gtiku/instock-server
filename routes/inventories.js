const express = require("express");
const router = express.Router();
const fs = require("fs");
const inventory = require("../data/inventories.json");
const inventoryController = require("../controllers/inventoryController");

// GET INVENTORIES
router.get("/", (req, res) => {
  try {
    const data = inventory.map((item) => {
      return {
        id: item.id,
        warehouse_id: item.warehouse_id,
        item_name: item.item_name,
        description: item.description,
        category: item.category,
        status: item.status,
        quantity: item.quantity,
      };
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Server is unable to be reached currently. Please try again. ",
      specific: error,
    });
  }
});

// GET single inventory item

router.get("/:id", inventoryController.getInventoryItem);

module.exports = router;
