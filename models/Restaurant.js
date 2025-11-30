const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required:true },
  description: String,
  address: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [String],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Restaurant', restaurantSchema);
