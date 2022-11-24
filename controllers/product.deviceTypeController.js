const Product = require("../models/productSchema");

module.exports = {
  post: async (req, res) => {
    let _id = req.params.id;
    let { devices } = req.body;

    let prod = await Product.find({ $and: [{ _id, devices }] });
    if (prod.length != 0) return res.status(400).send("device already exixts");

    try {
      let response = await Product.updateOne({ _id }, { $push: { devices } });
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },

  delete: async (req, res) => {
    let _id = req.params.id;
    let value = req.params.value;

    let prod = await Product.find({ devices: value });
    if (prod.length == 0) return res.send("device doesn't exixts");

    try {
      let response = await Product.updateOne(
        { _id },
        { $pull: { devices: value } }
      );
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },
};
