const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload-file");
const productController = require('../controllers/productController')


router.get("/", productController.get);

router.get("/:id", productController.getSingleProduct);

// Get mac_adress and send the version of the corresponding product.
router.get("/mac_address/:mac_address", productController.getProductByMacAddress);


router.post("/", upload.single("upload_file"), productController.post);


//Here its necessary to pass the mac_address through api's because of update file 
router.put("/:id", upload.single("upload_file"), productController.put);


router.delete("/:id", productController.delete);

module.exports = router;