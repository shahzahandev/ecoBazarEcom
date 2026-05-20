let emptyFillValidation = require('../utils/validation')
let Product = require('../models/productModel')


let productController = async(req, res) =>{
  let {title, price, category} = req.body

  emptyFillValidation(res, title, price, category)

  let existingProduct = await Product.findOne({title: title})

  let sku = `${Date.now()}-${Date.getFullYear()}`

  let product = new Product ({
    ...req.body,
    sku: sku
  })

  await product.save()

  return res.status(201).json({
    success: true,
    message: 'Product created successfully.'
  })
}

module.exports = {productController}