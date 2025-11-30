const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Meal = require('../models/Meal');

exports.placeOrder = async (req,res) => {
  // Build order from body or from cart
  let items = req.body.items;
  if(!items || items.length===0) {
    // take from cart
    const cart = await CartItem.find({ user: req.user._id }).populate('meal');
    items = cart.map(c=>({ meal: c.meal._id, name:c.meal.name, price:c.meal.price, qty:c.qty }));
  }
  const total = items.reduce((s,i)=> s + (i.price * i.qty), 0);
  const order = await Order.create({
    customer: req.user._id,
    restaurant: req.body.restaurant,
    items, total, address: req.body.address,
    status: 'preparing'
  });
  // clear cart if used
  await CartItem.deleteMany({ user: req.user._id });
  res.status(201).json(order);
};

exports.listUserOrders = async (req,res) => {
  if(req.user.role === 'admin') {
    const all = await Order.find().populate('customer restaurant driver');
    return res.json(all);
  }
  const orders = await Order.find({ customer: req.user._id }).populate('restaurant driver');
  res.json(orders);
};

exports.getOrder = async (req,res) => {
  const o = await Order.findById(req.params.id).populate('items.meal restaurant driver customer');
  res.json(o);
};

exports.updateStatus = async (req,res) => {
  const { status, driverId } = req.body;
  const o = await Order.findById(req.params.id);
  if(!o) return res.status(404).json({ message:'Not found' });
  if(status) o.status = status;
  if(driverId) o.driver = driverId;
  await o.save();
  res.json(o);
};

exports.deleteOrder = async (req,res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success:true });
};
