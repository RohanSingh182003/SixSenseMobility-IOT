const express = require('express')
const app = express();
const cors = require('cors')

// middlewares
app.use(express.json())
app.use(cors())

let port = process.env.PORT || 4000

app.listen(port,()=> console.log(`app is listening on port ${port}`))

app.get('/',(req,res)=>{
    res.send('Hello Working!')
})