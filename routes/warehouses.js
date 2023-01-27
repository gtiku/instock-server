const express = require("express");
const router = express.Router();
const fs = require("fs");
const warehouseController = require("../controllers/warehouseController");

// GET ALL WAREHOUSES
// GET WAREHOUSES
router.route("/").get(warehouseController.index);

//GET SINGLE WAREHOUSE
router.get("/:id", warehouseController.getWarehouse);

//ADD WAREHOUSE TO WAREHOUSES
router
  .route("/")
  .get(warehouseController.index)
  .post(warehouseController.addWarehouse);

//GET INVENTORY BY WAREHOUSE ID
router.route("/:id/inventories").get(warehouseController.getWarehouseInventory);

module.exports = router;
