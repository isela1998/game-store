const express = require('express');

// Controllers
const {
  createConsole,
  updateConsole,
  deleteConsole,
  getAllConsole,
} = require('../controllers/consoles.controller');

// Middlewares
const { consoleExists } = require('../middlewares/find.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');

const {
  createConsoleValidators,
  updateConsoleValidators,
} = require('../middlewares/validators.middlewares');

const consoleRouter = express.Router();

// Public routes
consoleRouter.get('/', getAllConsole);

// Protecting below endpoints
consoleRouter.use(protectSession);

consoleRouter.post('/', createConsoleValidators, createConsole);

consoleRouter.patch(
  '/:id',
  consoleExists,
  updateConsoleValidators,
  updateConsole
);

consoleRouter.delete('/:id', consoleExists, deleteConsole);

module.exports = { consoleRouter };
