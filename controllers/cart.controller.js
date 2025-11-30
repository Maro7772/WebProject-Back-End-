const CartItem = require('../models/CartItem');
const Meal = require('../models/Meal');

exports.add = async (req,res) => {
  const { mealId, qty, notes } = req.body;
  const meal = await Meal.findById(mealId);
  if(!meal) return res.status(400).json({message:'Meal not found'});
  const item = await CartItem.create({ user: req.user._id, meal: meal._id, qty, notes });
  res.status(201).json(item);
};

exports.getCart = async (req,res) => {
  const items = await CartItem.find({ user: req.user._id }).populate('meal');
  res.json(items);
};

exports.update = async (req,res) => {
  const it = await CartItem.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new:true });
  res.json(it);
};

exports.remove = async (req,res) => {
  await CartItem.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ success:true });
};
