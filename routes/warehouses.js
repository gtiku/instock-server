const express = require("express");
const router = express.Router();
const fs = require("fs");
const warehouses = require("../data/warehouses.json");

// GET WAREHOUSES
router.get("/", (req, res) => {
  try {
    const data = warehouses.map((detail) => {
      return {
        id: detail.id,
        warehouse_name: detail.warehouse_name,
        address: detail.address,
        city: detail.city,
        country: detail.country,
        contact_name: detail.contact_name,
        contact_phone: detail.contact_phone,
        contact_email: detail.contact_email,
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

//GET SINGLE WAREHOUSE
router.get("/:id", (req, res) => {
  const warehouseList = JSON.parse(fs.readFileSync("./data/warehouses.json"));

  res.json(warehouseList.find((warehouse) => req.params.id === warehouse.id));
});

module.exports = router;
