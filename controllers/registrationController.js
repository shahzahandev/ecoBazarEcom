const User = require('../models/userModelSchema')
const { mailVerification } = require('../utils/email');
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

    // <=== if email, password & confirm password are empty ===>
    emptyFillValidation(res, email, password, confirmPassword, terms)

    // <=== if password & Confirm password don't match ===>
    if (password !== confirmPassword) {
        return res.send({ message: "Don't match password." })
    }

    // <=== if terms is false ===>
    if (!terms) {
        return res.send({ message: "Please, Accept our Terms and Condition." })
    }

    // <=== MongoDB saving proccess START ===>
    let user = new User({
        email: email,
        password: password,
        terms: terms
    })
    user.save()

    // <=== Token Genarate ===>
    tokenGenerator({
        id: user._id,
        email: user.email
    }, process.env.TOKEN_SECRET, {
        expiresIn: "1d"
    })

    mailVerification(token, email)

    return res.send({ message: "User created successfully." })
    // <=== MongoDB saving proccess END ===>
}

module.exports = registrationController

// ndmt uxan reaf igve