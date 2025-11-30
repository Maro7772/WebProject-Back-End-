const carts = {}; // userId -> [ { cartItemId, menuItemId, qty, notes } ]
const { v4: uuidv4 } = require('uuid');
module.exports = {
get: async (userId)=> carts[userId] || [],
add: async (userId,item)=>{ item.cartItemId = uuidv4(); carts[userId] = carts[userId] || []; carts[userId].push(item); return item; },
update: async (userId, cartItemId, patch)=>{ const c = carts[userId]||[]; const it = c.find(x=>x.cartItemId===cartItemId); if(!it) throw new Error('Not found'); Object.assign(it,patch); return it; },
remove: async (userId, cartItemId)=>{ const c = carts[userId]||[]; const idx = c.findIndex(x=>x.cartItemId===cartItemId); if(idx>=0) c.splice(idx,1); },
clear: async (userId)=>{ carts[userId]=[]; }
}