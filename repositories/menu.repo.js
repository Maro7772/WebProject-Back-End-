const { v4: uuidv4 } = require('uuid');
const items = [];
module.exports = {
listByRestaurant: async (rid)=> items.filter(i=>i.restaurantId===rid),
get: async (id)=> items.find(i=>i.id===id),
create: async (it)=>{ it.id = uuidv4(); items.push(it); return it; },
update: async (id,patch)=>{ const it = items.find(x=>x.id===id); if(!it) throw new Error('Not found'); Object.assign(it,patch); return it; },
remove: async (id)=>{ const idx = items.findIndex(x=>x.id===id); if(idx>=0) items.splice(idx,1); }
}