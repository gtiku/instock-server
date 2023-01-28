const express = require("express");
const router = express.Router();
const fs = require("fs");
const warehouseController = require("../controllers/warehouseController");

// GET ALL WAREHOUSES
// GET WAREHOUSES
router.route("/").get(warehouseController.index);

//GET SINGLE WAREHOUSE
router.get("/:id", warehouseController.getWarehouse);

//DELETE SINGLE WAREHOUSE
router.delete("/:id", warehouseController.deleteWarehouse);

//DELETE SINGLE WAREHOUSE
router.delete("/:id", warehouseController.deleteWarehouse);

//ADD WAREHOUSE TO WAREHOUSES
router
  .route("/")
  .get(warehouseController.index)
  .post(warehouseController.addWarehouse);

//EDIT WAREHOUSE DETAILS & CONTACT INFO
router
.route("/:id")
.get(warehouseController.getWarehouse)
.put(warehouseController.editWarehouse)


//GET INVENTORY BY WAREHOUSE ID
router.route("/:id/inventories").get(warehouseController.getWarehouseInventory);

module.exports = router;
