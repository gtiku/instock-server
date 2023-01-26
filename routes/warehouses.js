const express = require("express");
const router = express.Router();
const fs = require("fs");
const warehouseController = require("../controllers/warehouseController");

// GET WAREHOUSES
router.get("/", (req, res, next) => {
  res.status(201).json();
});

//GET SINGLE WAREHOUSE
router.get("/:id", warehouseController.getWarehouse);

module.exports = router;
