const express = require("express");
const router = express.Router();
const fs = require("fs");
const warehouseController = require("../controllers/warehouseController");

// GET WAREHOUSES (KNEX)
router.route("/").get(warehouseController.index);

//GET SINGLE WAREHOUSE
router.get("/:id", warehouseController.getWarehouse);

//DELETE SINGLE WAREHOUSE
router.delete("/:id", warehouseController.deleteWarehouse);

module.exports = router;
