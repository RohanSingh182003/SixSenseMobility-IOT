const express = require('express')
const app = express()
const router = express.Router()

router.get('/',(req,res)=> {
    res.send('Get Request')
})
router.post('/',(req,res)=> {
    res.send('POST Request')
})
router.put('/',(req,res)=> {
    res.send('PUT Request')
})
router.delete('/',(req,res)=> {
    res.send('DELETE Request')
})

module.exports = router;