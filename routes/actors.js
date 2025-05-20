const router = require('express').Router();
const actorsController = require('../controllers/actors');

// GET
router.get("/", actorsController.getAll);
router.get("/search", actorsController.getSingleQueries);
router.get("/id/:id", actorsController.getSingle);

// POST
router.post("/", actorsController.addActors);

// PUT
router.put("/:id", actorsController.updateActors);

// DELETE
router.delete("/:id", actorsController.deleteActors);

module.exports = router;