const express = require("express");
const routers = express.Router();
const mongoose = require("mongoose");
const {Customers , validateCustomer } = require('../models/customer')

routers.get("/", async (req, res) => {
  const customers = await Customers.find().sort({
    name: 1,
    isGold: 1,
    phone: 1,
  });
  res.send(customers);
});

routers.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(404).send("Bad Request");

  let customers = await Customers({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  if (!customers) return res.status(400).send("Bad Request");

  await customers.save();
  res.send(customers);
});

routers.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(404).send("Bad Request");

  const customers = await Customers.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    { new: true }
  );
  if (!customers) return res.status(400).send("Bad Request");
  res.send(customers);
});

routers.delete("/:id", async (req, res) => {
  const customers = await Customers.findByIdAndRemove(req.params.id);
  if (!customers) return res.status(400).send("Bad Request");
  res.send(customers);
});

routers.get("/:id", async (req, res) => {
  const customers = await Customers.findById(req.params.id);
  if (!customers) return res.status(400).send("Bad Request");
  res.send(customers);
});

module.exports = routers;
