const Restaurant = require('../models/Restaurant');
exports.create = async (req,res)=> {
  const payload = req.body;
  payload.owner = req.user._id;
  const r = await Restaurant.create(payload);
  res.status(201).json(r);
};
exports.list = async (req,res) => {
  const all = await Restaurant.find();
  res.json(all);
};
exports.get = async (req,res)=> {
  const r = await Restaurant.findById(req.params.id);
  res.json(r);
};
exports.update = async (req,res)=> {
  const r = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(r);
};
exports.remove = async (req,res)=> {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.json({ success:true });
};
