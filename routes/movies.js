const router = require('express').Router();
const moviesController = require('../controllers/movies');
const { 
    movieValidationRules,
    movieQueryNameValidateRules,
    movieParamIDValidateRules 
} = require('../helpers/movieValidator');
const validate = require('../helpers/validate');


// GET
router.get("/", moviesController.getAll);
router.get("/search", movieQueryNameValidateRules(), validate, moviesController.getSingleQueries);
router.get("/id/:id", movieParamIDValidateRules(), validate, moviesController.getSingle);

// POST
router.post("/", movieValidationRules(), validate, moviesController.addMovie);

// PUT
router.put("/:id", movieValidationRules(), movieParamIDValidateRules(), validate, moviesController.updateMovie);

// Delete
router.delete("/:id", movieParamIDValidateRules(), validate, moviesController.deleteMovie);

module.exports = router;