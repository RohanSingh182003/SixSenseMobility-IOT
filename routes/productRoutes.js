const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload-file");
const productController = require('../controllers/productController')


router.get("/", productController.get);

router.get("/:id", productController.getSingleProduct);


router.get("/mac_address/:mac_address", productController.getProductByMacAddress); // Get mac_adress and send the version of the corresponding product.


router.post("/", upload.single("upload_file"), productController.post);

router.post("/device/:id", upload.single("upload_file"), productController.postSingleDevice);

router.post("/deviceType/:id", upload.single("upload_file"), productController.postDeviceType);


router.put("/:id", upload.single("upload_file"), productController.put); //Here its necessary to pass the mac_address through api's because of update file 


router.delete("/:id", productController.delete);

module.exports = router;