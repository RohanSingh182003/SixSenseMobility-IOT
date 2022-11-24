const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload-file");
const productController = require('../controllers/productController')
const productDeviceTypeController = require('../controllers/product.deviceTypeController')
const productDeviceController = require('../controllers/product.deviceController')

router.get("/", productController.get);

router.get("/:id", productController.getSingleProduct);


router.get("/mac_address/:mac_address", productController.getProductByMacAddress); // Get mac_adress and send the version of the corresponding product.


router.post("/", upload.single("upload_file"), productController.post);

router.post("/device/:id", upload.single("upload_file"), productDeviceController.post);

router.post("/deviceType/:id", upload.single("upload_file"), productDeviceTypeController.post);

router.put("/device/:id", upload.single("upload_file"), productDeviceController.put); //Here its necessary to pass the mac_address through api's because of update file 


router.delete("/:id", productController.delete);

router.delete("/device/:id", productDeviceController.delete);

router.delete("/device/:id/:device_type", productDeviceController.deleteProducts);

router.delete("/deviceType/:id/:value", productDeviceTypeController.delete);



module.exports = router;