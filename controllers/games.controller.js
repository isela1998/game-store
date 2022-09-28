// Models
const { User } = require('../models/user.model');
const { Game } = require('../models/game.model');
const { Review } = require('../models/review.model');
const { Console } = require('../models/console.model');
const { GameInConsole } = require('../models/gameInConsole.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

// Get all active games
const getAllGames = catchAsync(async (req, res, next) => {
  const games = await Game.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Review,
        attributes: ['id', 'comment', 'status'],
        include: {
          model: User,
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
      },
      { model: Console, through: { attributes: [] } },
    ],
  });

  // Send success response
  res.status(200).json({
    status: 'success',
    data: { games },
  });
});

// Create a new game
const createGame = catchAsync(async (req, res, next) => {
  const { title, genre, consoleId } = req.body;

  const newGame = await Game.create({
    title,
    genre,
  });

  // Associate game to console
  GameInConsole.create({ consoleId, gameId: newGame.id });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: 'success',
    data: { newGame },
  });
});

// Update title game
const updateGame = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const { game } = req;

  await game.update({ title });

  res.status(200).json({
    status: 'success',
    data: { game },
  });
});

// Soft delete game
const deleteGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  await game.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});

// Add new game review
const newReview = catchAsync(async (req, res, next) => {
  const { comment } = req.body;
  const { gameId } = req.params;
  const { sessionUser } = req;

  const newReview = await Review.create({
    userId: sessionUser.id,
    gameId,
    comment,
  });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: 'success',
    data: { newReview },
  });
});

module.exports = { getAllGames, createGame, updateGame, deleteGame, newReview };
