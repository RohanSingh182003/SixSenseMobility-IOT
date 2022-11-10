const express = require('express')
const app = express();
const cors = require('cors');
const { default: mongoose } = require( 'mongoose' );

// middlewares
app.use(express.json())
app.use(cors())

let port = process.env.PORT || 4000
let mongoConnectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/product'

app.listen(port,()=> console.log(`app is listening on port ${port}`))
mongoose.connect(mongoConnectionString,()=> console.log('DB Connected!'))

app.get('/',(req,res)=>{
    res.send('Hello Working!')
})