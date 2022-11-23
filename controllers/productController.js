const fs = require("fs");
const Product = require("../models/productSchema");

module.exports = {
  get: async (req, res) => {
    try {
      const response = await Product.find();
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  },

  getSingleProduct: async (req, res) => {
    let _id = req.params.id;
    let member = await Product.find({ _id });
    if (member.length > 0) {
      res.send(member);
    } else {
      res.status(404).json({ message: "no product found :(" });
    }
  },

  getProductByMacAddress: async (req, res) => {
    try {
      let prod = await Product.find({ mac_address: req.params.mac_address });
      if (prod.length > 0) {
        let version = prod[0].version;
        res.status(200).json({
          version,
          file_path: `https://six-sense-mobility-iot.vercel.app/static/${req.params.mac_address}.bin`,
        });
      } else {
        res.status(404).json({ message: "product not found :(" });
      }
    } catch (error) {
      res.send(error);
    }
  },

  post: async (req, res) => {
    let { name, isAdmin, devices, product } = req.body;
    try {
      const ins = new Product({ name, isAdmin, devices, product });
      const response = await ins.save();
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  },

  postSingleDevice: async (req, res) => {
    try {
      let _id = req.params.id;
      let { product } = req.body;
      let response = await Product.updateOne(
        { _id },
        { $push: { product } }
      );
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },

  postDeviceType : async (req,res) => {
    try {
      let _id = req.params.id;
      let { devices } = req.body;
      let response = await Product.updateOne(
        { _id },
        { $push: { devices } }
      );
      res.send(response);
    } catch (error) {
      res.send(error.message);
    }
  },

  put: async (req, res) => {
    let _id = req.params.id;
    let prod = await Product.find({ _id });
    if (prod.length == 0) {
      res.send("Product not found :( .");
    }
    try {
      let response = await Product.findByIdAndUpdate(
        { _id },
        {
          version: req.body.version,
          last_updated: req.body.last_updated,
        }
      );
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    let id = req.params.id;
    let response = await Product.find({ _id: id });
    if (response.length > 0) {
      let fileName = response[0].mac_address;
      const filePath = `uploads/${fileName}.bin`;
      try {
        const response = await Product.findByIdAndDelete({ _id: id });
        fs.unlink(filePath, () => console.log("deleted successfully."));
        res.send(response);
      } catch (error) {
        res.status(404).send(error);
      }
    } else {
      res.status(404).json({ message: "No Product found!" });
    }
  },
};
