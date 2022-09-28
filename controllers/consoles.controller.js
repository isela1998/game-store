// Models
const { Game } = require('../models/game.model');
const { Console } = require('../models/console.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

// Get all active consoles
const getAllConsole = catchAsync(async (req, res, next) => {
  const consoles = await Console.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Game,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      through: { attributes: [] },
    },
  });

  res.status(200).json({
    status: 'success',
    data: { consoles },
  });
});

// Create a new console
const createConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;

  const newConsole = await Console.create({
    name,
    company,
  });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: 'success',
    data: { newConsole },
  });
});

// Update name console
const updateConsole = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { console } = req;

  await console.update({ name });

  res.status(200).json({
    status: 'success',
    data: { console },
  });
});

// Delete soft of console
const deleteConsole = catchAsync(async (req, res, next) => {
  const { console } = req;

  await console.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});

module.exports = { getAllConsole, createConsole, updateConsole, deleteConsole };
