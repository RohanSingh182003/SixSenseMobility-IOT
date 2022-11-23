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

    let _id = req.params.id;
    let version = req.body.version

    let prod = await Product.find({"product._id":_id})
    if(prod.length == 0) return res.send("device doesn't exixts")

    try {
      let response = await Product.updateOne(
        {"product._id":_id},
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
