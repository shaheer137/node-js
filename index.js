const express = require('express')
const db = require('./config/db')
const cors = require('cors')
const app = express()

app.use(cors())

app.listen(3000,function(){
    console.log('listening on 3000')
})

db.connection.once('open',()=>{
    console.log('db connected successfully')
}).on("error",(e)=>{
    console.log('error:', e)
})

app.use(express.json())

console.log('Hello')

app.use('/',require('./routes/index'))