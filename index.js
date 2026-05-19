require('dotenv').config()
require('node:dns/promises').setServers(['1.1.1.1','8.8.8.8']);
const cors = require('cors')
const express = require('express')
const app = express()
const dbConnection = require('./config/dbConnection')
const {  registrationController, loginController, forgotPasswordController, reSetPasswordController, resendEmailVerificationController, verifyEmailController } = require('./controllers/registrationController')
const { rateLimit } = require('express-rate-limit'); 
const { getAllUsersController, singleUserController, deleteUserController, updateUserController } = require('./controllers/userController');

// <=== middleware ===>
app.use(express.json())
app.use(cors())

// <==== Database connetion =====>
dbConnection()

// <==== Registration Rotue =====>
app.post("/registration", registrationController)
app.post("/login", loginController)
app.post("/forgotPassword", forgotPasswordController)
app.post("/resetPassword/:token", reSetPasswordController)
app.post("/resendEmailVerification", resendEmailVerificationController)
app.post("/verifyEmailController/:token", verifyEmailController)

// Product Create

// Order Management 

// User Management
app.get("/allUsers", getAllUsersController)
app.get("/singleUser/:id", singleUserController)
app.delete("/deleteUser/:id", deleteUserController)
app.post("/udateUser/:id", updateUserController)


// <=== PORT ===> 
const port = process.env.PORT || 5000

// <=== port ===> 
app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})



// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000,
// 	limit: 100,
// 	standardHeaders: 'draft-8',
// 	legacyHeaders: false, 
// 	ipv6Subnet: 56,
// })

// app.use(limiter)
