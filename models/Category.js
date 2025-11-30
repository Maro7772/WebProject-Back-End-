const mongoose = require('mongoose');
const catSchema = new mongoose.Schema({
  name: { type:String, required:true },
  description: String
});
module.exports = mongoose.model('Category', catSchema);
