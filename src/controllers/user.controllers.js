const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/user.models');

router.post('/',
  body('first_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('first name cannot be empty!'),
  body('last_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('last name is required!'),
  body('email')
    .isEmail()
    .withMessage('Please enter valid email'),
  body('pincode')
    .trim()
    .not()
    .isEmpty()
    .withMessage('pincode is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('pincode must be exactly 6 digits'),
  body('age')
    .trim()
    .not()
    .isEmpty()
    .withMessage('age is required')
    .custom((val) => {
      if (val < 1 || val > 100) {
        throw new Error('age must be between 1 and 100');
      }
      return true;
    }),
  body('gender')
    .trim()
    .not()
    .isEmpty()
    .withMessage('gender is required')
    .custom((inp) => {
      if (inp !== 'Male' || inp !== 'Female' || inp !== 'Others') {
        throw new Error('only Male, Female and Other are accepted!');
      }
      return true;
    })
  , async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.create(req.body);
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  });

module.exports = router;