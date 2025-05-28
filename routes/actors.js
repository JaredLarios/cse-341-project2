const router = require('express').Router();
const actorsController = require('../controllers/actors');

const { 
    actorsValidationRules,
    actorsQueryNameValidateRules,
    actorsParamIDValidateRules
} = require('../helpers/actorsValidator');

const validate = require('../helpers/validate');

const { isAuthenticated } = require('../middleware/authenticate');


// GET
router.get("/", actorsController.getAll);
router.get("/search", actorsQueryNameValidateRules(), validate, actorsController.getSingleQueries);
router.get("/id/:id", actorsParamIDValidateRules(), validate, actorsController.getSingle);

// POST
router.post("/", isAuthenticated, actorsValidationRules(), validate, actorsController.addActors);

// PUT
router.put("/:id", isAuthenticated, actorsParamIDValidateRules(), actorsValidationRules(), validate, actorsController.updateActors);

// DELETE
router.delete("/:id", isAuthenticated, actorsParamIDValidateRules(), validate, actorsController.deleteActors);

module.exports = router;