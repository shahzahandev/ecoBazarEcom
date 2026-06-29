const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
   },
   quantity: {
      type: Number,
      min: 1,
      required: true
   },
   totalPrice:{
      type: Number,
      required: true
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
})

module.exports = mongoose.model("Card", cardSchema)