const fs = require("fs");
const Product = require("../models/productSchema");

module.exports = {
    post : async (req,res) => {
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
      }
}