const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cart.controller');
const auth = require('../middlewares/auth');

router.post('/add', auth, ctrl.add);
router.get('/', auth, ctrl.getCart);
router.put('/update/:id', auth, ctrl.update);
router.delete('/remove/:id', auth, ctrl.remove);

module.exports = router;
