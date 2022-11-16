const fs = require('fs');
const Products = require("../models/dashboardSchema");

module.exports = {

  get: async (req, res) => {
    try {
      const response = await Products.find();
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  },

  getSingleProduct: async (req, res) => {
    let _id = req.params.id;
    let member = await Products.find({ _id });
    if (member.length > 0) {
      res.send(member);
    } else {
      res.status(404).json({ message: "no product found :(" });
    }
  },

  getProductByMacAddress: async (req, res) => {
    try {
      let prod = await Products.find({ mac_address: req.params.mac_address });
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
    let prod_mac_address = await Products.find({
      mac_address: req.body.mac_address,
    });
    if (prod_mac_address.length > 0) {
      res.status(500).json({
        message:
          "product already exists , enter a different product or mac address.",
      });
    } else {
      try {
        const ins = new Products({
          prod_name: req.body.prod_name,
          ip_address: req.body.ip_address,
          mac_address: req.body.mac_address,
          function: req.body.function,
          version: Number.parseFloat(req.body.version),
          last_updated: req.body.last_updated,
        });
        const response = await ins.save();
        res.send(response);
      } catch (error) {
        res.send(error);
      }
    }
  },

  put: async (req, res) => {
    let _id = req.params.id;
    let prod = await Products.find({_id})
    if(prod.length == 0){
      res.send('Product not found :( .')
    }
    try {
      let response = await Products.findByIdAndUpdate({_id},{
        version : req.body.version,
        last_updated : req.body.last_updated
      })
      res.send(response)
    } catch (error) {
      console.log(error)
    }
  },

  delete: async (req, res) => {
    let id = req.params.id;
    let response = await Products.find({ _id: id });
    if (response.length > 0) {
      let fileName = response[0].mac_address
      const filePath = `uploads/${fileName}.bin`;
      try {
        const response = await Products.findByIdAndDelete({ _id: id });
        fs.unlink(filePath,()=> console.log('deleted successfully.'))
        res.send(response);
      } catch (error) {
        res.status(404).send(error);
      }
    } else {
      res.status(404).json({ message: "No Product found!" });
    }
  }

};
