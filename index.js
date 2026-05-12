require('dotenv').config()
require('node:dns/promises').setServers(['1.1.1.1','8.8.8.8']);
const cors = require('cors')
const express = require('express')
const app = express()
const dbConnection = require('./config/dbConnection')
const {  registrationController, loginController, forgotPasswordController, reSetPasswordController, resendEmailVerificationController } = require('./controllers/registrationController')

// <=== middleware ===>
app.use(express.json())
app.use(cors())

// <=== PORT ===> 
const port = process.env.PORT || 5000

// <==== Database connetion =====>
dbConnection()

// <==== Registration Rotue =====>
app.post("/registration", registrationController)
app.post("/login", loginController)
app.post("/forgotPassword", forgotPasswordController)
app.post("/resetPassword/:token", reSetPasswordController)
app.post("/resendEmailVerification", resendEmailVerificationController)


// <=== port ===> 
app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})