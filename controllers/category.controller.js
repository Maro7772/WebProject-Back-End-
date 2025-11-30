const Category = require('../models/Category');
exports.create = async (req,res)=> res.status(201).json(await Category.create(req.body));
exports.list = async (req,res)=> res.json(await Category.find());
exports.update = async (req,res)=> res.json(await Category.findByIdAndUpdate(req.params.id, req.body, { new:true }));
exports.remove = async (req,res)=> { await Category.findByIdAndDelete(req.params.id); res.json({ success:true }); };
