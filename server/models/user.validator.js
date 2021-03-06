// user.validator.js, 2021, FG
// Defines validators used for user/authentication related requests
// ------------------------------------------------------------------------

const check = require('express-validator').check;
const constants = require('../misc/constants');

// Validator for registration form
const RegistrationValidator = [
    check('email')
        .exists()
        .withMessage(constants.EMAIL_IS_EMPTY)
        .isEmail()
        .withMessage(constants.EMAIL_IS_IN_WRONG_FORMAT),
    check('password')
        .exists()
        .withMessage(constants.PASSWORD_IS_EMPTY)
        .isLength({min: 8})
        .withMessage(constants.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8)
        .isLength({max: 100})
        .withMessage(constants.PASSWORD_LENGTH_MUST_BE_LESS_THAN_100),
    check('name')
        .exists()
        .withMessage(constants.NAME_IS_MISSING)
        .isLength({max: 50})
        .withMessage(constants.NAME_TOO_LONG)
        .isLength({min: 1})
        .withMessage(constants.NAME_TOO_SHORT),
];

// Validator for login form
const LoginValidator = [
    check('email')
        .exists()
        .withMessage(constants.EMAIL_IS_EMPTY)
        .isEmail()
        .withMessage(constants.EMAIL_IS_IN_WRONG_FORMAT),
    check('password')
        .exists()
        .withMessage(constants.PASSWORD_IS_EMPTY)
        .isLength({min: 8})
        .withMessage(constants.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8)
        .isLength({max: 100})
        .withMessage(constants.PASSWORD_LENGTH_MUST_BE_LESS_THAN_100)
];

module.exports = {
    RegistrationValidator: RegistrationValidator,
    LoginValidator: LoginValidator
}