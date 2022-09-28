const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join('. ');

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  checkValidations,
];

const updateUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  checkValidations,
];

const createGameValidators = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Title cannot be empty'),
  body('genre')
    .isString()
    .withMessage('Genre must be a string')
    .notEmpty()
    .withMessage('Genre cannot be empty'),
  checkValidations,
];

const updateGameValidators = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Title cannot be empty'),
  checkValidations,
];

const createReviewValidators = [
  body('comment')
    .isString()
    .withMessage('Comment must be a string')
    .notEmpty()
    .withMessage('Comment cannot be empty'),
  checkValidations,
];

const createConsoleValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('company')
    .isString()
    .withMessage('Company must be a string')
    .notEmpty()
    .withMessage('Company cannot be empty'),
  checkValidations,
];

const updateConsoleValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  checkValidations,
];

module.exports = {
  createUserValidators,
  createGameValidators,
  createConsoleValidators,
  createReviewValidators,
  updateGameValidators,
  updateUserValidators,
  updateConsoleValidators,
};
