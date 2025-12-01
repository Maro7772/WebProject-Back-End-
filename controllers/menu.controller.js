const Meal = require('../models/Meal');
const Restaurant = require('../models/Restaurant');
const AppError = require('../utils/AppError');

// Get menu items for a restaurant
exports.getMenuItems = async (req, res, next) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }
  
  const menuItems = await Meal.find({ restaurant: restaurantId }).populate('category');
  res.json(menuItems);
};

// Get single menu item
exports.getMenuItem = async (req, res, next) => {
  const { menuItemId } = req.params;
  const menuItem = await Meal.findById(menuItemId).populate('category').populate('restaurant');
  if (!menuItem) {
    return next(new AppError('Menu item not found', 404));
  }
  res.json(menuItem);
};

// Create menu item
exports.createMenuItem = async (req, res, next) => {
  const { restaurantId } = req.params;
  
  // Check if restaurant exists
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }
  
  // Ensure owner can only create menu items for their own restaurant
  if (req.user.role === 'owner' && restaurant.owner.toString() !== req.user.id) {
    return next(new AppError('Forbidden', 403));
  }
  
  const menuItem = await Meal.create({
    ...req.body,
    restaurant: restaurantId
  });
  
  res.status(201).json(menuItem);
};

// Update menu item
exports.updateMenuItem = async (req, res, next) => {
  const { restaurantId, itemId } = req.params;
  
  // Check if restaurant exists
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }
  
  // Check if menu item exists and belongs to restaurant
  const menuItem = await Meal.findOne({ _id: itemId, restaurant: restaurantId });
  if (!menuItem) {
    return next(new AppError('Menu item not found', 404));
  }
  
  // Ensure owner can only update menu items for their own restaurant
  if (req.user.role === 'owner' && restaurant.owner.toString() !== req.user.id) {
    return next(new AppError('Forbidden', 403));
  }
  
  Object.assign(menuItem, req.body);
  await menuItem.save();
  
  res.json(menuItem);
};

// Delete menu item
exports.deleteMenuItem = async (req, res, next) => {
  const { restaurantId, itemId } = req.params;
  
  // Check if restaurant exists
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }
  
  // Check if menu item exists and belongs to restaurant
  const menuItem = await Meal.findOne({ _id: itemId, restaurant: restaurantId });
  if (!menuItem) {
    return next(new AppError('Menu item not found', 404));
  }
  
  // Ensure owner can only delete menu items for their own restaurant
  if (req.user.role === 'owner' && restaurant.owner.toString() !== req.user.id) {
    return next(new AppError('Forbidden', 403));
  }
  
  await Meal.findByIdAndDelete(itemId);
  res.json({ success: true });
};

