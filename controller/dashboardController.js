const Products = require("../models/ProductSchema");

const getProducts = async (req, res) => {
  // try {
  //   const response = await Products.find();
  //   res.send(response);
  // } catch (error) {
  //   res.send(error);
  // }
  res.send('Get')
};

// const getSingleDashboard = async (req, res) => {
//   let id = req.params.id;
//   let member = await Products.find({ _id: id });
//   if (member.length > 0) {
//     res.send(member);
//   } else {
//     res.status(404).json({ message: "no product found :(" });
//   }
// };

const addDashboard = async (req, res) => {
  // try {
  //   const ins = new Products({
  //     prod_name: req.body.prod_name,
  //     ip_address: req.body.ip_address,
  //     mac_address: req.body.mac_address,
  //     function: req.body.function,
  //     version: Number.parseFloat(req.body.version),
  //     last_updated: req.body.last_updated
  //   });
  //   const response = await ins.save();
  //   res.send(response);
  // } catch (error) {
  //   res.send(error);
  // }
  res.send('Add')
};

const updateDashboard = async (req, res) => {
  // let id = req.params.id;
  // let response = await Products.find({ _id: id });
  // if (response.length > 0) {
  //   if (
  //     req.body.prod_name.length >= 3 &&
  //     req.body.ip_address.length >= 3 &&
  //     req.body.mac_address.length >= 3 &&
  //     req.body.function.length >= 3
  //   ) {
  //     try {
  //       const response = await Products.findByIdAndUpdate(
  //         { _id: id },
  //         {
  //           prod_name: req.body.prod_name,
  //           ip_address: req.body.ip_address,
  //           mac_address: req.body.mac_address,
  //           function: req.body.function,
  //           version: Number.parseFloat(req.body.version),
  //           last_updated: req.body.last_updated
  //         }
  //       );
  //       res.send(response);
  //     } catch (error) {
  //       res.status(404).send(error);
  //     }
  //   } else {
  //     res.status(500).json({ message: "length is too sort..." });
  //   }
  // } else {
  //   res.status(404).json({ message: "no product found :(" });
  // }
  res.send('Update')
};

const deleteDashboard = async (req, res) => {
  // let id = req.params.id;
  // let response = await Products.find({ _id: id });
  // if (response.length > 0) {
  //   try {
  //     const response = await Products.findByIdAndDelete({ _id: id });
  //     res.send(response);
  //   } catch (error) {
  //     res.status(404).send(error);
  //   }
  // } else {
  //   res.status(404).json({ message: "No Product found!" });
  // }
  res.send('Delete')
};
module.exports = {
  getDashboard,
  getSingleDashboard,
  addDashboard,
  updateDashboard,
  deleteDashboard,
};
