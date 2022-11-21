const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  prod_name: {
    type: String,
    required: true,
  },
  products: [String],
});

const DeviceModel = new mongoose.model("Device", DeviceSchema);

module.exports = DeviceModel;
