const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
module.exports = (user) => jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });