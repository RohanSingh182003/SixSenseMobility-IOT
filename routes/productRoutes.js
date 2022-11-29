const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload-file");
const productController = require('../controllers/productController')
const productDeviceTypeController = require('../controllers/product.deviceTypeController')
const productDeviceController = require('../controllers/product.deviceController')
const authentication = require('../middlewares/auth')

router.get("/",authentication, productController.get);
router.get("/:id",authentication, productController.getSingleProduct);
router.get("/mac_address/:mac_address",authentication, productController.getProductByMacAddress); // Get mac_adress and send the version of the corresponding product.


router.post("/", productController.post);
router.post("/device/:id",authentication, upload.single("upload_file"), productDeviceController.post);
router.post("/deviceType/:id",authentication, productDeviceTypeController.post);

router.put("/device/:id",authentication, upload.single("upload_file"), productDeviceController.put); //Here its necessary to pass the mac_address through api's because of update file 


router.delete("/:id",authentication, productController.delete);
router.delete("/device/:id",authentication, productDeviceController.delete);
router.delete("/device/:id/:device_type",authentication, productDeviceController.deleteProducts);
router.delete("/deviceType/:id/:value",authentication, productDeviceTypeController.delete);



module.exports = router;