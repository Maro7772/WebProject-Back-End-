const { v4: uuidv4 } = require('uuid');
const orders = [];
module.exports = {
create: async (o)=>{ o.id = uuidv4(); orders.push(o); return o; },
listByUser: async (uid)=> orders.filter(x=>x.customerId===uid),
get: async (id)=> orders.find(x=>x.id===id),
updateStatus: async (id,status)=>{ const o = orders.find(x=>x.id===id); if(!o) throw new Error('Not found'); o.status = status; return o; },
assignDriver: async (orderId, driverId)=>{ const o = orders.find(x=>x.id===orderId); if(!o) throw new Error('Not found'); o.driverId = driverId; return o; }
}