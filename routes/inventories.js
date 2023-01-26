const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

router
  .route("/")
  .get(inventoryController.index)
  .post(inventoryController.postItem);

// GET single inventory item

router.get("/:id", inventoryController.getInventoryItem);

module.exports = router;
