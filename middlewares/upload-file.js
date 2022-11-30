const multer = require('multer')
const path = require('path')
const fs = require('fs');

const storage = multer.diskStorage({
    destination:  'uploads/',
    filename: (req,file,cb) => {
        return cb(null, `${req.body.product.mac_address}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage})

module.exports = upload;