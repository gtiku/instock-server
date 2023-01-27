const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

router
  .route("/")
  .get(inventoryController.index)
  .post(inventoryController.postItem);

router
  .route("/:id")
  .get(inventoryController.getInventoryItem)
  .put(inventoryController.updateItem)
  .delete(inventoryController.deleteItem);

module.exports = router;
