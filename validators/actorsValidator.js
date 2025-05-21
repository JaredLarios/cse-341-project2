const { body, query, param } = require('express-validator')

const actorsValidationRules = () => {
    const year = new Date().getFullYear();
    return [
        body('name')
            .isString().withMessage('Name must be a String')
            .isLength({ min: 2 }).withMessage('Name 2 characters min required.'),

        body('last_name')
            .isString().withMessage('Last Name must be a String')
            .isLength({ min: 2 }).withMessage('Last Name 2 characters min required.'),

        body('birthdate')
            .isDate().withMessage('Invalid Date Format.'),

        // Production Company must be string and Not Empty
        body('height_m')
            .isFloat().withMessage('Height must be a Floating Number'),

        // Rating must be Flaot
        body('country')
            .isString().withMessage('Country must be a String')
            .isLength({ min: 2 }).withMessage('Country 2 characters min required.'),,

        // Rating must be Flaot
        body('movies_id')
            .isArray().withMessage('Movies IDs must be a list of ids.')
    ]
}

const actorsQueryNameValidateRules = () => {
    return [
        query('name')
            .isString()
            .withMessage('Name is required.')
            .isLength({ min: 2 })
            .withMessage('Name should be greater than 2 characters.')
    ]
}

const actorsParamIDValidateRules = () => {
    return [
        param('id')
            .isLength({ min: 24, max: 24 })
            .withMessage('ID must be a 24 character hex string')
            .isHexadecimal()
            .withMessage('ID must be hexadecimal')
    ]
}

module.exports = {
    actorsValidationRules,
    actorsQueryNameValidateRules,
    actorsParamIDValidateRules
}