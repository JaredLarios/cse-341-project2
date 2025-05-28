const router = require('express').Router();
const moviesController = require('../controllers/movies');
const { 
    movieValidationRules,
    movieQueryNameValidateRules,
    movieParamIDValidateRules 
} = require('../helpers/movieValidator');
const validate = require('../helpers/validate');

const { isAuthenticated } = require('../middleware/authenticate');


// GET
router.get("/", moviesController.getAll);
router.get("/search", movieQueryNameValidateRules(), validate, moviesController.getSingleQueries);
router.get("/id/:id", movieParamIDValidateRules(), validate, moviesController.getSingle);

// POST
router.post("/", isAuthenticated, movieValidationRules(), validate, moviesController.addMovie);

// PUT
router.put("/:id", isAuthenticated, movieValidationRules(), movieParamIDValidateRules(), validate, moviesController.updateMovie);

// Delete
router.delete("/:id", isAuthenticated, movieParamIDValidateRules(), validate, moviesController.deleteMovie);

module.exports = router;