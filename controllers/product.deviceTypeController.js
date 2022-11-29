const Product = require("../models/productSchema");

module.exports = {
  post: async (req, res) => {
    let _id = req.params.id;
    let { devices } = req.body;
    
    let prod = await Product.find({ $and: [{ _id, devices }] });
    let myDevice = await Product.findOne({_id})
    if(!(myDevice.email === req.product.email)) return res.status(401).send('you are not allowed to access')
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
    let myDevice = await Product.findOne({_id})
    if(!(myDevice.email === req.product.email)) return res.status(401).send('you are not allowed to access')
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
