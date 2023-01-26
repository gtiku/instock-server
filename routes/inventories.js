const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

// GET INVENTORIES
router.route("/").get(inventoryController.index);

// GET single inventory item

router.get("/:id", inventoryController.getInventoryItem);

module.exports = router;
