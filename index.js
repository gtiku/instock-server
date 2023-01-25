const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5050;
const warehouseRoutes = require("./routes/warehouses");
const inventoriesRoutes = require("./routes/inventories");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/warehouses/", warehouseRoutes);
app.use("/api/v1/inventories/", inventoriesRoutes);

app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
