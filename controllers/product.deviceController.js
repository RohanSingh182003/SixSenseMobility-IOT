const fs = require("fs");
const Product = require("../models/productSchema");

module.exports = {
  post: async (req, res) => {
    try {
      let _id = req.params.id;
      let { product } = req.body;
      let existing_prod = await Product.find({
        $and: [{ _id }, { "product.mac_address": product.mac_address }],
      });
      if (existing_prod.length != 0)
      return res.status(400).send("product aleady exists.");
      
      let prod = await Product.find({ _id });
      if(!(prod.email === req.product.email)) return res.status(401).send('you are not allowed to access')
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
    if(!(prod.email === req.product.email)) return res.status(401).send('you are not allowed to access')
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
    let prod = await Product.findOne({ "product._id": _id });
    if(!(prod.email === req.product.email)) return res.status(401).send('you are not allowed to access')
    let device = prod.product.find((ele) => ele._id.toString() === _id);
    if (prod.length == 0) return res.send("device doesn't exixts");
    const filePath = `uploads/${prod.email}/${device.mac_address}.bin`;
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
    let _id = req.params.id;
    let device_type = req.params.device_type;
    let prod = await Product.findOne({ _id });
    if(!(prod.email === req.product.email)) return res.status(401).send('you are not allowed to access')
    let filter_prod = prod.product.filter(
      (item) => item.device_type === device_type
    );
    let del_prod_mac_address = [];
    filter_prod.forEach((element) => {
      del_prod_mac_address.push(element.mac_address);
    });
    if (prod.length == 0) return res.send("device doesn't exixts");

    try {
      let response = await Product.updateOne(
        { _id },
        { $pull: { product: { device_type } } }
      );
      del_prod_mac_address.forEach((element) => {
        const filePath = `uploads/${prod.email}/${element}.bin`;
        fs.unlink(filePath, () => console.log("deleted successfully."));
      });
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },
};
