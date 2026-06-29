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

        const existingProductOnCart = await Card.findOne({ product: proid, user: userid });

        if (existingProductOnCart) {
            existingProductOnCart.quantity += 1
            existingProductOnCart.totalPrice = existingProductOnCart.totalPrice + existingProduct.price
            existingProductOnCart.save();

            return res.status(200).json({
                success: true,
                message: 'Product quantity updated successfully',
                data: existingProductOnCart
            });
        }

        let card = new Card({
            product: proid,
            quantity: 1,
            totalPrice: existingProduct.price,
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
        const { type, userid } = req.body

        const cart = await Card.findOne({ _id: id,  user: userid })
        const product = await Product.findById(cart.product )

        if (type === 'plus') {
            cart.quantity += 1;
            cart.totalPrice = cart.totalPrice + product.price
            await cart.save();

        } else if (type === 'minus') {
            if (cart.quantity <= 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity cannot be less than 1'
                });
            }

            cart.quantity -= 1;
            cart.totalPrice = cart.totalPrice - product.price
            await cart.save();

        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid type. Use plus or minus'
            });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: cart
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