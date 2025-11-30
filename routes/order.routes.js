const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/order.controller');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

router.post('/', auth, ctrl.placeOrder);
router.get('/', auth, ctrl.listUserOrders);
router.get('/:id', auth, ctrl.getOrder);
router.put('/status/:id', auth, roles('owner','employee','driver','admin'), ctrl.updateStatus);
router.delete('/:id', auth, roles('admin'), ctrl.deleteOrder);

module.exports = router;
