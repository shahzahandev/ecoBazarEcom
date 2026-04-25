require('dotenv').config()
const express = require('express')
const app = express()
const dbConnection = require('./config/dbConnection')
const registrationController = require('./controllers/registrationController')

app.use(express.json())

// <=== PORT ===>
const port = process.env.PORT || 5000

// <==== Database connetion =====>
dbConnection()

// <==== Registration Rotue =====>
app.post("/registration", registrationController)


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})