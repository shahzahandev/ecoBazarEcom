const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
   proudct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
   },
   quantiiy: {
      type: Number,
      min: 1,
      required: true
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
})

module.exports = mongoose.model("Card", cardSchema)