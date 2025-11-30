const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const AppError = require('../utils/AppError');


module.exports = (req,res,next)=>{
const header = req.headers.authorization;
if(!header) return next(new AppError('Not authenticated',401));
const token = header.split(' ')[1];
try{
const decoded = jwt.verify(token, JWT_SECRET);
req.user = decoded;
next();
}catch(e){
next(new AppError('Invalid token',401));
}
}