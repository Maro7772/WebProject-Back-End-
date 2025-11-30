const userRepo = require('../repositories/user.repo');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


module.exports = {
register: async ({name,email,password,role='customer'})=>{
const exists = await userRepo.findByEmail(email);
if(exists) throw new Error('Email exists');
const hash = await bcrypt.hash(password,10);
const user = await userRepo.create({name,email,passwordHash:hash,role});
const token = generateToken({id:user.id,role:user.role,email:user.email});
return { user, token };
},
login: async ({email,password})=>{
const user = await userRepo.findByEmail(email);
if(!user) throw new Error('Invalid credentials');
const ok = await bcrypt.compare(password, user.passwordHash);
if(!ok) throw new Error('Invalid credentials');
const token = generateToken({id:user.id,role:user.role,email:user.email});
return { user, token };
}
}