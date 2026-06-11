const mongoose = require('mongoose');
const Schema = mongoose

const cardSchema = new Schema({
   proudct:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
   },
   quantiiy:{
    type: Number,
    min: 1,
    required: true
   }
})

module.exports = mongoose.model("Card", cardSchema)