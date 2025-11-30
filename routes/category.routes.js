const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/category.controller');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

router.post('/', auth, roles('admin'), ctrl.create);
router.get('/', ctrl.list);
router.put('/:id', auth, roles('admin'), ctrl.update);
router.delete('/:id', auth, roles('admin'), ctrl.remove);

module.exports = router;