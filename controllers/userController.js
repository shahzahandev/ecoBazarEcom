const User = require('../models/userModelSchema')

// All user data
let getAllUsersController = async (req, res) => {
    try {
        const userData = await User.find({})
        return res.send({
            success: true,
            message: 'All user data.',
            userData: userData
        })
    } catch (error) {
        return res.send({
            success: false,
            message: 'Server error.',
            error: error
        })
    }
}

// Single user data
let singleUserController = async (req, res) => {
    let { id } = req.params

    try {
        let singleUserData = await User.findById(id)
        return res.send({
            success: true,
            message: `Single User data.`,
            user: singleUserData
        })
    } catch (error) {
        return res.send({
            success: false,
            message: 'Server error.',
            error: error
        })
    }
}

// Delete user
let deleteUserController = async (req, res) => {
    let { id } = req.params

    try {
        let deleteUserData = await User.findByIdAndDelete(id)
        return res.send({
            success: true,
            message: `User deleted successfully.`
        })
    } catch (error) {
        return res.send({
            success: false,
            message: 'Server error.',
            error: error
        })
    }
}

// Update user
let updateUserController = async (req, res) => {
    let { id } = req.params

    try {
        let updateUserData = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        return res.send({
            success: true,
            message: `User updated successfully done.`,
            updateUser: updateUserData
        })
    } catch (error) {
        return res.send({
            success: false,
            message: 'Server error.',
            error: error
        })
    }
}

module.exports = { getAllUsersController, singleUserController, deleteUserController, updateUserController }