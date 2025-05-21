const { body, query, param } = require('express-validator')

const movieValidationRules = () => {
    const year = new Date().getFullYear();
    return [
        // Name must be String and Not Empty
        body('name')
            .isString().withMessage('Name must be a String')
            .isLength({ min: 2 }).withMessage('Name 2 characters min required.'),

        // Released Year must be year format YYYY
        body('released_year')
            .isInt({ min: 1900, max: year }).withMessage('Year range must be between 1900 until now'),

        // Director Name must be String and Not Empty
        body('director_name')
            .isString().withMessage('Director Name must be a String')
            .isLength({ min: 2 }).withMessage('Director Name must be greater than 2 characters'),

        // Production Company must be string and Not Empty
        body('production_company')
            .isString().withMessage('Production Company must be a String')
            .isLength({ min: 2 }).withMessage('Production Company must be greater than 2 characters'),

        // Streaming must be string and Not Empty
        body('streaming')
            .isString().withMessage('Streaming must be a String')
            .isLength({ min: 2 }).withMessage('Streaming must be greater than 2 characters'),

        // Rating must be Flaot
        body('rating')
            .isFloat().withMessage('Rating must be a Floating Number'),

        // Rating must be Flaot
        body('classification')
            .isString().withMessage('Classification must be a String')
            .isLength({ max: 5 }).withMessage('Classification must less than 5'),

        // Rating must be boolean
        body('blockbuster')
            .isBoolean().withMessage('Classification must be a Boolean'),

        // Rating must be boolean
        body('global_profit_usd_m')
            .isFloat({ min: 2 }).withMessage('Classification must be a Floating Number'),
    ]
}

const movieQueryNameValidateRules = () => {
    return [
        query('name')
            .isString()
            .withMessage('Name is required.')
            .isLength({ min: 2 })
            .withMessage('Name should be greater than 2 characters.')
    ]
}

const movieParamIDValidateRules = () => {
    return [
        param('id')
            .isLength({ min: 24, max: 24 })
            .withMessage('ID must be a 24 character hex string')
            .isHexadecimal()
            .withMessage('ID must be hexadecimal')
    ]
}

module.exports = {
    movieValidationRules,
    movieQueryNameValidateRules,
    movieParamIDValidateRules
}