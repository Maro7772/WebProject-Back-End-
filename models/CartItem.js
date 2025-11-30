const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  meal: { type: mongoose.Schema.Types.ObjectId, ref:'Meal', required:true },
  qty: { type: Number, default: 1 },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('CartItem', cartItemSchema);
