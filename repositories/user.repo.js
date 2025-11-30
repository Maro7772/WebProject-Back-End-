const { v4: uuidv4 } = require('uuid');
const users = [];
module.exports = {
create: async (u)=>{ u.id = uuidv4(); users.push(u); return u; },
findByEmail: async (email)=> users.find(x=>x.email===email),
findById: async (id)=> users.find(x=>x.id===id),
list: async ()=> users,
updateRole: async (id,role)=>{ const u = users.find(x=>x.id===id); if(!u) throw new Error('Not found'); u.role = role; return u; }
}