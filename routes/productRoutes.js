const express = require("express");
const app = express();
const router = express.Router();
const Products = require("../models/dashboardSchema");

const {
  getProducts,
  getSingleDashboard,
  addDashboard,
  updateDashboard,
  deleteDashboard,
} = require("../models/dashboardSchema");

// router.get('/',getDashboard)

router.get("/", async (req, res) => {
  try {
    const response = await Products.find();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let member = await Products.find({ _id: id });
  if (member.length > 0) {
    res.send(member);
  } else {
    res.status(404).json({ message: "no product found :(" });
  }
});

// Get mac_adress and send the version of the corresponding product.
router.get("/mac_address/:mac_address", async (req, res) => {
  try {
    let prod = await Products.find({ mac_address: req.params.mac_address });
    if (prod.length > 0) {
      let version = prod[0].version;
      res.status(200).json({ version });
    } else {
      res.status(404).json({ message: "product not found :(" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
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
});

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let response = await Products.find({ _id: id });
  if (response.length > 0) {
    if (
      req.body.prod_name.length >= 3 &&
      req.body.ip_address.length >= 3 &&
      req.body.mac_address.length >= 3 &&
      req.body.function.length >= 3
    ) {
      try {
        const response = await Products.findByIdAndUpdate(
          { _id: id },
          {
            prod_name: req.body.prod_name,
            ip_address: req.body.ip_address,
            mac_address: req.body.mac_address,
            function: req.body.function,
            version: Number.parseFloat(req.body.version),
            last_updated: req.body.last_updated,
          }
        );
        res.send(response);
      } catch (error) {
        res.status(404).send(error);
      }
    } else {
      res.status(500).json({ message: "length is too sort..." });
    }
  } else {
    res.status(404).json({ message: "no product found :(" });
  }
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let response = await Products.find({ _id: id });
  if (response.length > 0) {
    try {
      const response = await Products.findByIdAndDelete({ _id: id });
      res.send(response);
    } catch (error) {
      res.status(404).send(error);
    }
  } else {
    res.status(404).json({ message: "No Product found!" });
  }
});

module.exports = router;
