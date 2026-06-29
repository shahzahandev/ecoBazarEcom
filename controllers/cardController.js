const Card = require('../models/cardModel');
const Product = require('../models/productModel');


//  Create Cart
const createCart = async (req, res) => {
    try {
        const { proid, userid } = req.body

        const existingProduct = await Product.findOne({ _id: proid })

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        let card = new Card({
            product: proid,
            quantity: 1,
            user: userid
        })
        await card.save();

        return res.status(200).json({
            success: true,
            message: 'Product added successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }

}

// Cart Quantity increDecre
const increDecre = async (req, res) => {
    try {
        const { id } = req.params // this id will be card id
        const { type } = req.body

        const product = await Card.findById({ _id: id })

        if (type === 'plus') {
            product.quantity += 1;
        } else if (type === 'minus') {
            if (product.quantity <= 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity cannot be less than 1'
                });
            }

            product.quantity -= 1;
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid type. Use plus or minus'
            });
        }

        await product.save();

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        })
    }
}

// Cart Delete
const cartdelete = async (req, res) => {
    try {
        const { id } = req.params

        const deletedCart = await Card.findByIdAndDelete({ _id: id })

        if (!deletedCart) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product Deleted sucessfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        })
    }
}

// Get card Controller
const getCard = async (req, res) => {
    try {
        const { userId } = req.params

        const card = await Card.find({ user: userId }).populate("user product")

        let totalPrice = 0
        card.forEach(item => {
            totalPrice += item.product.price * item.quantity;
        })

        return res.status(200).json({
            success: true,
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

module.exports = { createCart, increDecre, cartdelete, getCard }