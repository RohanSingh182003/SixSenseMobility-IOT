const fs = require("fs");
const Product = require("../models/productSchema");
const jwt = require('jsonwebtoken')

module.exports = {
  get: async (req, res) => {
    if(!req.product.isAdmin) return res.status(401).send('you are not allowed to access')
    try {
      const response = await Product.find();
      res.send(response);
    } catch (error) {
      console.log(error.message);
    }
  },
  
  getSingleProduct: async (req, res) => {
    let _id = req.params.id;
    let product = await Product.findOne({ _id });
    if(!(product.email === req.product.email || req.product.isAdmin)) return res.status(401).send('you are not allowed to access')
    if (product) {
      res.send(product);
    } else {
      res.status(404).json({ message: "no product found :(" });
    }
  },

  getProductByMacAddress: async (req, res) => {
    try {
      let mac_address = req.params.mac_address;
      let prod = await Product.findOne({ "product.mac_address" : mac_address });
      if(!(prod.email === req.product.email || req.product.isAdmin)) return res.status(401).send('you are not allowed to access')
      let filter_prod = prod.product.find(
        (item) => item.mac_address === mac_address
      );
      if (prod) {
        let version = filter_prod.version;
        res.status(200).json({
          version,
          file_path: `http://localhost:3000/static/${req.params.mac_address}.bin`,
        });
      } else {
        res.status(404).json({ message: "product not found :(" });
      }
    } catch (error) {
      res.send(error);
    }
  },

  post: async (req, res) => {
    let { email, isAdmin, devices, product } = req.body;
    let existing_prod = await Product.findOne({email})
    if(existing_prod) return res.status(400).send('product already exists!')
    let token = jwt.sign(
      { email, isAdmin, devices, product },
      "SixSenseMobility"
    );
    try {
      const response = await Product.create({ email, isAdmin, devices, product, token });
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  },

  delete: async (req, res) => {
    let id = req.params.id;
    let response = await Product.findOne({ _id: id });
    if(!response) return res.status(400).send('product not found.')
    if(!(response.email === req.product.email || req.product.isAdmin)) return res.status(401).send('you are not allowed to access')
      const filePath = `uploads/${response.email}`;
      try {
        const response = await Product.findByIdAndDelete({ _id: id });
        fs.unlink(filePath, () => console.log("deleted successfully."));
        res.send(response);
      } catch (error) {
        res.status(404).send(error);
      }
  },
};
