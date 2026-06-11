const Card = require('../models/cardModel');
const Product = require('../models/productModel');

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
            quantiiy: 1
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

module.exports = {createCard}