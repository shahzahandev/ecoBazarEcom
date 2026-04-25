const mongoose = require('mongoose')
const suceMiddleWare = require('../middleWare/suceMiddleWare')
const { Schema } = mongoose

let userModelSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    terms: {
        type: Boolean
    },
    profile: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'editor', 'vendor'],
        default: 'user'
    },
    isHold: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false

    },

    billingAddress: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        companyName: {
            type: String
        },
        street: {
            type: String
        },
        state: {
            type: String
        },
        zipCode: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        country: {
            type: String
        },
    }
})

module.exports = mongoose.model("User", userModelSchema)