const User = require('../models/userModelSchema')

let registrationController = async (req, res) => {
        const { email, password, confirmPassword, terms } = req.body
        
        // <=== User Access by Email ===>
        let existingUser = await User.findOne({ email: email })

        // <=== If User already Avaiable ===>
        if (existingUser) {
            return res.send({ message: 'User Already Exist.' })
        }
         
         // <=== if email & password don't match ===>
        if (!email || !password || !confirmPassword) {
            return res.send({ message: "Please, Fill all the input." })
        }

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
        return res.send({ message: "User created successfully." })
        // <=== MongoDB saving proccess END ===>
    }

module.exports = registrationController