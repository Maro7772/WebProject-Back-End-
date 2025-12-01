const express = require('express');
const router = express.Router();
const addressCtrl = require('../controllers/address.controller');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

// Customer address routes
router.get('/:id/addresses', auth, roles('customer'), addressCtrl.getAddresses);
router.post('/:id/addresses', auth, roles('customer'), addressCtrl.addAddress);
router.put('/:id/addresses/:addressId', auth, roles('customer'), addressCtrl.updateAddress);
router.delete('/:id/addresses/:addressId', auth, roles('customer'), addressCtrl.deleteAddress);

module.exports = router;

