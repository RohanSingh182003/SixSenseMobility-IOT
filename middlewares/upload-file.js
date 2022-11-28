const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req,file,cb) => {
        console.log(file)
        return cb(null, `${req.body.product.mac_address}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage})

module.exports = upload;