const express = require("express");
const router = express.Router();
const fs = require("fs");

// GET WAREHOUSES
router.get("/", (req, res, next) => {
  res.status(201).json();
});

module.exports = router;
