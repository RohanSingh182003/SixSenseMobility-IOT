const jwt = require('jsonwebtoken')

const authentication = (req,res,next) => {
    if(!req.headers.authorization) return res.status(401).send('authentication token required!')
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, 'SixSenseMobility', (err, product) => {
        if(err) return res.status(403).send(err.message)
        req.product = product
        next()
      });
}

module.exports = authentication