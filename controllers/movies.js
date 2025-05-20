const mongodb = require('../data/database');
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Movies']
    const response = await mongodb.getDatabase().db().collection("movies").find();
    response.toArray().then((movies) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(movies);
    })
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("movies").findOne({_id: movieId});
    res.status(200).json(response);
}

const getSingleQueries = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieName = String(req.query.name);
    const response = await mongodb.getDatabase().db().collection("movies").findOne({ name: movieName });
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ message: "Movie not found." });
    }
}

const addMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movie = {
        name: req.body.name,
        released_year: req.body.released_year,
        director_name:  req.body.director_name,
        production_company:  req.body.production_company,
        streaming: req.body.streaming,
        rating: req.body.rating,
        classification: req.body.classification,
        blockbuster: req.body.blockbuster,
        global_profit_usd_m: req.body.global_profit_usd_m,
    }
    const response = await mongodb.getDatabase().db().collection("movies").insertOne(movie);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while adding the movie.")
    }
}

const updateMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const movie = {
        name: req.body.name,
        released_year: req.body.released_year,
        director_name:  req.body.director_name,
        production_company:  req.body.production_company,
        streaming: req.body.streaming,
        rating: req.body.rating,
        classification: req.body.classification,
        blockbuster: req.body.blockbuster,
        global_profit_usd_m: req.body.global_profit_usd_m,
    }
    const response = await mongodb.getDatabase().db().collection("movies").replaceOne({_id: movieId}, movie);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the movie.")
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("movies").deleteOne({_id: movieId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting the movie.")
    }
};

module.exports = {
    getAll,
    getSingle,
    getSingleQueries,
    addMovie,
    updateMovie,
    deleteMovie
}