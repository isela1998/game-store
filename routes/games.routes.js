const express = require('express');

// Controllers
const {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  newReview,
} = require('../controllers/games.controller');

// Middlewares
const { gameExists } = require('../middlewares/find.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');

const {
  createGameValidators,
  createReviewValidators,
  updateGameValidators,
} = require('../middlewares/validators.middlewares');

const gameRouter = express.Router();

gameRouter.get('/', getAllGames);

// Protecting below endpoints
gameRouter.use(protectSession);

gameRouter.post('/', createGameValidators, createGame);

gameRouter.patch('/:id', gameExists, updateGameValidators, updateGame);

gameRouter.delete('/:id', gameExists, deleteGame);

gameRouter.post('/reviews/:gameId', createReviewValidators, newReview);

module.exports = { gameRouter };
