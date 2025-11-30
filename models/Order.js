const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref:'Restaurant', required:true },
  items: [{
    meal: { type: mongoose.Schema.Types.ObjectId, ref:'Meal' },
    name: String,
    price: Number,
    qty: Number
  }],
  total: Number,
  status: { type: String, enum: ['preparing','on_the_way','delivered','cancelled'], default:'preparing' },
  driver: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  address: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
