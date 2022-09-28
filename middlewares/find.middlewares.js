// Models
const { User } = require('../models/user.model');
const { Game } = require('../models/game.model');
const { Console } = require('../models/console.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

// Find if exist user
const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });

  // If user doesn't exist, send error message
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // req.anyPropName = 'anyValue'
  req.user = user;
  next();
});

// Find if exist game
const gameExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const game = await Game.findOne({
    where: { id, status: 'active' },
  });

  // If game doesn't exist, send error message
  if (!game) {
    return next(new AppError('Game not found', 404));
  }

  req.game = game;
  next();
});

// Find if exist console
const consoleExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const console = await Console.findOne({
    where: { id, status: 'active' },
  });

  // If console doesn't exist, send error message
  if (!console) {
    return next(new AppError('Console not found', 404));
  }

  req.console = console;
  next();
});

module.exports = {
  userExists,
  gameExists,
  consoleExists,
};
