const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

// GET INVENTORIES
router.route("/").get(inventoryController.index);

module.exports = router;
