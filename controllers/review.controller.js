const Review = require('../models/Review');

exports.add = async (req,res) => {
  const payload = { ...req.body, customer: req.user._id };
  const r = await Review.create(payload);
  res.status(201).json(r);
};

exports.listByMeal = async (req,res) => {
  const list = await Review.find({ meal: req.params.mealId }).populate('customer');
  res.json(list);
};

exports.remove = async (req,res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ success:true });
};
