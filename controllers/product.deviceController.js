const fs = require("fs");
const Product = require("../models/productSchema");

module.exports = {
  post: async (req, res) => {
    try {
      let _id = req.params.id;
      let { product } = req.body;
      let existing_prod = await Product.find({ $and: [{_id},{"product.mac_address": product.mac_address}]});
      if (existing_prod.length != 0)
        return res.status(400).send("product aleady exists.");

      let prod = await Product.find({ _id });
      if (prod.length == 0) return res.send("device doesn't exixts");

      try {
        let response = await Product.updateOne({ _id }, { $push: { product } });
        res.send(response);
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  put: async (req, res) => {
    let _id = req.params.id;
    let version = req.body.product.version;

    let prod = await Product.find({ "product._id": _id });
    if (prod.length == 0) return res.send("device doesn't exixts");

    try {
      let response = await Product.updateOne(
        { "product._id": _id },
        {
          $set: { "product.$.version": version },
        }
      );
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },

  delete: async (req, res) => {
    let _id = req.params.id;
    let email = req.query.email
    let mac_address = req.query.mac_address
    let prod = await Product.find({ "product._id": _id });
    if (prod.length == 0) return res.send("device doesn't exixts");
    const filePath = `uploads/${email}/${mac_address}.bin`;
    try {
      let response = await Product.updateOne(
        { "product._id": _id },
        { $pull: { product: { _id } } }
      );
      fs.unlink(filePath, () => console.log("deleted successfully."));
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },

  deleteProducts: async (req, res) => {
    let prod = await Product.find({ _id: req.params.id });

    if (prod.length == 0) return res.send("device doesn't exixts");

    try {
      let response = await Product.updateOne(
        { _id: req.params.id },
        { $pull: { product: { device_type: req.params.device_type } } }
      );
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },
};
