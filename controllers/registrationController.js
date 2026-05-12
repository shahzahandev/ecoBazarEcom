const User = require('../models/userModelSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

const { mailVerification, resetPassword } = require('../utils/email');
const { tokenGenerator } = require('../utils/tokenGenerator');
const { emptyFillValidation } = require('../utils/validation');



let registrationController = async (req, res) => {
    const { email, password, confirmPassword, terms } = req.body

    // <=== Access user by Email ===>
    let existingUser = await User.findOne({ email: email })

    // <=== If User already Avaiable ===>
    if (existingUser) {
        return res.send({ message: 'User Already Exist.' })
    }

    // <=== if email, password & confirm password terms are empty ===>
    emptyFillValidation(res, email, password, confirmPassword, terms)

    // <=== if password & Confirm password don't match ===>
    if (password !== confirmPassword) {
        return res.send({ message: "Don't match password." })
    }

    // <=== if terms is false ===>
    if (!terms) {
        return res.send({ message: "Please, Accept our Terms and Condition." })
    }
    const hash = bcrypt.hashSync(password, 10)
    // <=== MongoDB saving proccess START ===>
    let user = new User({
        email, password: hash, terms
    })
    user.save()

    // <=== Token Genarate ===>
    let token = tokenGenerator({
        id: user._id,
        email: user.email
    }, process.env.TOKEN_SECRET,
        process.env.JWT_EXPIRES)

    // <===  Mail Verification ===>
    mailVerification(token, email)

    return res.send({ message: "User created successfully." })
    // <=== MongoDB saving proccess END ===>
}

let loginController = async (req, res) => {
    const { email, password } = req.body

    // <=== Access user by Email ===>
    let existingUser = await User.findOne({ email: email })

    // <=== If User already Avaiable ===>
    if (!existingUser) {
        return res.send({
            success: false,
            message: 'User not found.'
        })
    }

    // <=== if email & password are empty ===>
    emptyFillValidation(res, email, password)

    // <=== Password matching proccess ===>
    let pass = bcrypt.compareSync(password, existingUser.password);
    if (!pass) {
        // <=== If password not matching ===> 
        return res.send({
            success: false,
            message: 'Invalid Credential.'
        })
    } else {
        // <=== If password matching ===> 
        return res.send({
            success: true,
            message: 'Login successfully done.'
        })
    }
}

let forgotPasswordController = async (req, res) => {

    let { email } = req.body

    // <=== Access user by Email ===>
    let existingUser = await User.findOne({ email: email })

    // <=== If User already Avaiable ===>
    if (!existingUser) {
        return res.send({
            success: false,
            message: 'User not found.'
        })
    }

    // <=== When email is empty ===>
    emptyFillValidation(res, email)

    // <=== Token Genarate ===>
    let token = tokenGenerator({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.TOKEN_SECRET,
        process.env.JWT_EXPIRES)

    // <===  Mail Verification ===>
    resetPassword(token, email)

    // <===If everything is ok, then Response message ===>
    return res.send({
        success: true,
        message: 'Please, check your email.'
    })
}

let reSetPasswordController = async (req, res) => {

    let { newPassword, confirmPassword } = req.body
    let { token } = req.params

    if (newPassword !== confirmPassword) {
        return res.send({
            success: false,
            message: "Don't match password."
        })
    }

    // <=== token decoded ===>
    jwt.verify(token, process.env.TOKEN_SECRET, async function (err, decoded) {
        if (err) {
            return res.send({ message: "Unauthorization." })
        } else {
            let hash = bcrypt.hashSync(newPassword, 10)
            let updateData = await User.findByIdAndUpdate({ _id: decoded.id }, { password: newPassword })
            return res.send({
                success: true,
                message: 'Password updated.'
            })
        }
    });
}

let resendEmailVerificationController = async (req, res) => {

    let { email } = req.body

    // <=== Access user by Email ===>
    let existingUser = await User.findOne({ email: email })

    // <=== Token Genarate ===>
    let token = tokenGenerator({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.TOKEN_SECRET,
        process.env.JWT_EXPIRES)

    // <===  Mail Verification ===>
    mailVerification(token, email)

    // <===If everything is ok, then Response message ===>
    return res.send({
        success: true,
        message: 'Check your email for Validation.'
    })
}

module.exports = { registrationController, loginController, forgotPasswordController, reSetPasswordController, resendEmailVerificationController }

// ndmt uxan reaf igve