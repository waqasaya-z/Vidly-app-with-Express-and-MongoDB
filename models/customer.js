const mongoose = require("mongoose");
const Joi = require("joi");

const customersSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true, minlength: 5, maxlength: 50 },
  name: { type: String, default: false, required: true },
  phone: { type: Number, required: true },
});

const Customers = mongoose.model("Customers", customersSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.number().min(5).max(50).required(),
  });

  return schema.validate(customer);
}

exports.Customers = Customers;
exports.validate = validateCustomer;
