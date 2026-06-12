const Card = require('../models/cardModel');
const Product = require('../models/productModel');



// Card create controller
const createCard = async (req, res) => {
    try {
        const { id } = req.params

        const existingProduct = await Product.findOne({ id })

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        let cart = new Card({
            product: id,
            quantiiy: 1,
            userId: userId
        })
        await Card.save();

        return res.status(200).json({
            success: true,
            message: 'Product added successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: 'Server error'
        })
    }

}

// Product increDecre Controller
const increDecre = async (req, res) => {
    try {
        const { id } = req.params
        const { type } = req.body

        const product = await Product.findOne({ id })

        if (type === 'plus') {
            product.quantiiy = product.quantiiy + 1
        } else {
            product.quantiiy = product.quantiiy - 1
        }
        await product.save();

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

// Product Delete Controller
const Productdelete = async (req, res) => {
    try {
        const { id } = req.params

        await Card.findByIdAndDelete({ id })

        return res.status(200).json({
            success: true,
            message: 'Product Deleted'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}


// Get card Controller
const getCard = async (req, res) => {
    try {
        const { userId } = req.params

        const card = await Card.find({ _id: userI })

        let totalPrice = 0

        card.map(item => {
            totalPrice += item.price
        })

        return res.status(200).json({
            success: false,
            card,
            totalPrice
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

module.exports = { createCard, increDecre, Productdelete, getCard }