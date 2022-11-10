const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require( 'mongoose' );
const router = require('./routes/productRoutes')
require('dotenv').config()

// middlewares
app.use(express.json())
app.use(cors())

let port = process.env.PORT || 4000
let mongoConnectionString = process.env.MONGO_URI || 'mongodb://sixsensemobility:Wbkyfma36VS2vR5Hmw3m0BAxKdRjml2FNSBXRiDvi4iv2hz1de3cBvrdhWPQWr9zTDmg8wZWtrQUACDbkBLslg==@sixsensemobility.mongo.cosmos.azure.com:10255/dashboard?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@sixsensemobility@'

app.listen(port,()=> console.log(`app is listening on port ${port}`))
mongoose.connect(mongoConnectionString,()=> console.log('DB Connected!'))

app.use('/',router)

