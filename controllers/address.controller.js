const Address = require('../models/Address');
const AppError = require('../utils/AppError');

// Get customer addresses
exports.getAddresses = async (req, res, next) => {
  const { id } = req.params;
  
  // Ensure customer can only access their own addresses
  if (req.user.role === 'customer' && req.user.id !== id) {
    return next(new AppError('Forbidden', 403));
  }
  
  const addresses = await Address.find({ customer: id });
  res.json(addresses);
};

// Add new address
exports.addAddress = async (req, res, next) => {
  const { id } = req.params;
  
  // Ensure customer can only add addresses to their own account
  if (req.user.role === 'customer' && req.user.id !== id) {
    return next(new AppError('Forbidden', 403));
  }
  
  const { street, city, state, zipCode, country, isDefault } = req.body;
  
  // If setting as default, unset other default addresses
  if (isDefault) {
    await Address.updateMany(
      { customer: id },
      { isDefault: false }
    );
  }
  
  const address = await Address.create({
    customer: id,
    street,
    city,
    state,
    zipCode,
    country,
    isDefault: isDefault || false
  });
  
  res.status(201).json(address);
};

// Update address
exports.updateAddress = async (req, res, next) => {
  const { id, addressId } = req.params;
  
  // Ensure customer can only update their own addresses
  if (req.user.role === 'customer' && req.user.id !== id) {
    return next(new AppError('Forbidden', 403));
  }
  
  const address = await Address.findOne({ _id: addressId, customer: id });
  if (!address) {
    return next(new AppError('Address not found', 404));
  }
  
  const { street, city, state, zipCode, country, isDefault } = req.body;
  
  // If setting as default, unset other default addresses
  if (isDefault) {
    await Address.updateMany(
      { customer: id, _id: { $ne: addressId } },
      { isDefault: false }
    );
  }
  
  Object.assign(address, { street, city, state, zipCode, country, isDefault });
  await address.save();
  
  res.json(address);
};

// Delete address
exports.deleteAddress = async (req, res, next) => {
  const { id, addressId } = req.params;
  
  // Ensure customer can only delete their own addresses
  if (req.user.role === 'customer' && req.user.id !== id) {
    return next(new AppError('Forbidden', 403));
  }
  
  const address = await Address.findOneAndDelete({ _id: addressId, customer: id });
  if (!address) {
    return next(new AppError('Address not found', 404));
  }
  
  res.json({ success: true });
};

