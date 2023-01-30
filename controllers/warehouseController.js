const knex = require("knex")(require("../knexfile"));

const addWarehouse = (req, res) => {
  const {
    id,
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  if (
    !id ||
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res
      .status(405)
      .json({ error: true, message: "Warehouse information not received" });
  }

  const validPhone = (input) => {
    let check = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return check.test(input);
  };

  if (!validPhone(contact_phone)) {
    return res
      .status(405)
      .json({ error: true, message: "Updated phone number is not valid" });
  }

  const formatPhoneNumber = (number) => {
    let phoneNumberArray = number.toString().split("");
    phoneNumberArray.splice(0, 0, "(");
    phoneNumberArray.splice(4, 0, ") ");
    phoneNumberArray.splice(8, 0, "-");
    return "+1 " + phoneNumberArray.join("");
  };
  const phoneNumber = formatPhoneNumber(contact_phone);

  const validEmail = (input) => {
    let check =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(String(input).toLowerCase());
  };

  if (!validEmail(contact_email)) {
    return res
      .status(405)
      .json({ error: true, message: "Updated email address is not valid" });
  }

  knex("warehouses")
    .insert({
      id: id,
      warehouse_name: warehouse_name,
      address: address,
      city: city,
      country: country,
      contact_name: contact_name,
      contact_position: contact_position,
      contact_phone: phoneNumber,
      contact_email: contact_email,
    })
    .then((warehouse) => {
      const newWarehouseURL = `/api/v1/warehouses/${warehouse[0]}`;
      res.status(201).location(newWarehouseURL).send(newWarehouseURL);
      console.log(newWarehouseURL);
    })
    .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};

// Edit an existing Warehouse details and contact info

const editWarehouse = (req, res) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res.status(405).json({
      error: true,
      message: "Updated warehouse information not received",
    });
  }

  const validPhone = (input) => {
    let check = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return check.test(input);
  };

  if (!validPhone(contact_phone)) {
    return res
      .status(405)
      .json({ error: true, message: "Updated phone number is not valid" });
  }

  const formatPhoneNumber = (number) => {
    let phoneNumberArray = number.toString().split("");
    phoneNumberArray.splice(0, 0, "(");
    phoneNumberArray.splice(4, 0, ") ");
    phoneNumberArray.splice(8, 0, "-");
    return "+1 " + phoneNumberArray.join("");
  };
  const phoneNumber = formatPhoneNumber(contact_phone);

  const validEmail = (input) => {
    let check =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(String(input).toLowerCase());
  };

  if (!validEmail(contact_email)) {
    return res
      .status(405)
      .json({ error: true, message: "Updated email address is not valid" });
  }

  knex("warehouses")
    .where("warehouses.id", "=", req.params.id)
    .update({
      id: req.params.id,
      warehouse_name: warehouse_name,
      address: address,
      city: city,
      country: country,
      contact_name: contact_name,
      contact_position: contact_position,
      contact_phone: phoneNumber,
      contact_email: contact_email,
    })
    .then((updatedWarehouse) => {
      res.json(updatedWarehouse);
      console.log(updatedWarehouse);
    })
    .catch((err) => res.status(400).send(`Error updating Warehouse: ${err}`));
};

const getWarehouse = (req, res) => {
  knex
    .select("*")
    .from("warehouses")
    .where({ id: req.params.id })
    .then((warehouse) => {
      res.json(warehouse[0]);
    })
    .catch((error) => {
      res.status(404).send("Warehouse not found.");
      console.log(error);
    });
};

const deleteWarehouse = (req, res) => {
  knex("warehouses")
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res
        .status(204)
        .send(`${req.params.warehouse_name} warehouse has been deleted.`);
    })
    .catch((error) => {
      res.status(400).send(`Error deleting ${req.params.warehouse_id}`);
      console.log(error);
    });
};

// GET full list of warehouses

const index = (_req, res) => {
  knex
    .select("*")
    .from("warehouses")
    .then((warehouses) => {
      res.json(warehouses);
    })
    .catch((error) => {
      res.status(400).json({
        error: true,
        message: "Server cannot be reached",
        specific: error,
      });
    });
};

//GET individual warehouse inventory list

const getWarehouseInventory = (req, res) => {
  knex
    .select("*")
    .from("inventories")
    .where("warehouse_id", "=", req.params.id)
    .then((inventories) => {
      res.json(inventories);
    })
    .catch((error) => {
      res.status(404).send("No inventory found at this location.");
      console.log(error);
    });
};

module.exports = {
  index,
  getWarehouse,
  addWarehouse,
  editWarehouse,
  deleteWarehouse,
  getWarehouseInventory,
};
