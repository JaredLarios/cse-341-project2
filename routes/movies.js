const router = require('express').Router();

const moviesController = require("../controllers/movies");

// GET
router.get("/", moviesController.getAll);
router.get("/by", moviesController.getSingleQueries);
router.get("/id/:id", moviesController.getSingle);

// POST
router.post("/", moviesController.addMovie);

// PUT
router.put("/:id", moviesController.updateMovie);

// Delete
router.delete("/:id", moviesController.deleteMovie);

module.exports = router;