const fs = require("fs");
const Product = require("../models/productSchema");

module.exports = {
  get: async (req, res) => {
    try {
      const response = await Product.find();
      res.send(response);
    } catch (error) {
      console.log(error.message);
    }
  },

  getSingleProduct: async (req, res) => {
    let _id = req.params.id;
    let member = await Product.find({ _id });
    if (member.length > 0) {
      res.send(member[0]);
    } else {
      res.status(404).json({ message: "no product found :(" });
    }
  },

  getProductByMacAddress: async (req, res) => {
    try {
    let email = req.query.email
    let mac_address = req.params.mac_address
    if(!email) return res.status(400).send('query email is mendetory! its like ?email=<emai> at the end of url.')
      let prod = await Product.findOne({ email });
      let filter_prod = prod.product.find(item => item.mac_address === mac_address)
      if (prod) {
        let version = filter_prod.version;
        res.status(200).json({
          version,
          file_path: `http://localhost:3000/static/${email}/${req.params.mac_address}.bin`,
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
    try {
      const ins = new Product({ email, isAdmin, devices, product });
      const response = await ins.save();
      res.send(response);
    } catch (error) {
      res.send(error);
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
