const multer = require('multer')
const path = require('path')
const fs = require('fs');

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        const dir = `./uploads/${req.body.email}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, `uploads/${req.body.email}/`)
      },
    filename: (req,file,cb) => {
        return cb(null, `${req.body.product.mac_address}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage})

module.exports = upload;