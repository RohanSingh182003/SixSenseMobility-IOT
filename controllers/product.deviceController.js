const fs = require("fs");
const Product = require("../models/productSchema");

module.exports = {
  post: async (req, res) => {

    let _id = req.params.id;
    let { product } = req.body;

    let prod = await Product.find({_id})
    if(prod.length == 0) return res.send("device doesn't exixts")

    try {
      let response = await Product.updateOne({ _id }, { $push: { product } });
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },

  put: async (req, res) => {

    let mac_address = req.params.mac_address;

    let prod = await Product.find({"product.mac_address":mac_address})
    if(prod.length == 0) return res.send("device doesn't exixts")

    try {
      let response = await Product.updateOne(
        { "product.mac_address": mac_address },
        {
          $set: { "product.$.status": "in-active" },
        }
      );
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },

  delete: async (req, res) => {

    let _id = req.params.id;

    let prod = await Product.find({"product._id" : _id})
    if(prod.length == 0) return res.send("device doesn't exixts")

    try {
      let response = await Product.updateOne(
        {"product._id" : _id},
        { $pull: { product: { _id } } }
      );
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },
};
