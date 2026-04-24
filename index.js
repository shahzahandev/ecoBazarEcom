require('dotenv').config()
const express = require('express')
const app = express()
const dbConnection = require('./config/dbConnection')

app.use(express.json())
// port
const port = process.env.PORT || 5000

//<==== Database connetion =====>
dbConnection()

app.get("/registration", (req, res) => {
    res.send("hello, Developers.")
})

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);  
})