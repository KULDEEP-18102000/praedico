const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
const app = express()
var cors = require('cors')
const port = 5000
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/admin',require('./routes/admin'))
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})