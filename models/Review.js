const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref:'Restaurant' },
  meal: { type: mongoose.Schema.Types.ObjectId, ref:'Meal' },
  rating: { type: Number, min:1, max:5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Review', reviewSchema);
