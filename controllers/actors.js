const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Actors']
    const response = await mongodb.getDatabase().db().collection("actors").find();
    response.toArray().then((movies) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(movies);
    })
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Actors']
    const actorsId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("actors").findOne({_id: actorsId});
    res.status(200).json(response);
}

const getSingleQueries = async (req, res) => {
    //#swagger.tags=['Actors']
    const actorsName = String(req.query.name);
    const response = await mongodb.getDatabase().db().collection("actors").findOne({ name: actorsName });
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ message: "Movie not found." });
    }
}

const addActors = async (req, res) => {
    //#swagger.tags=['Actors']
    const actor = {
        name: req.body.name,
        last_name: req.body.last_name,
        birthdate: req.body.birthdate,
        height_m: req.body.height_m,
        country: req.body.country,
        movies_id: req.body.movies_id
    }
    const response = await mongodb.getDatabase().db().collection("actors").insertOne(actor);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while adding the movie.")
    }
}

const updateActors = async (req, res) => {
    //#swagger.tags=['Actors']
    const actorId = new ObjectId(req.params.id);
    const actor = {
        name: req.body.name,
        last_name: req.body.last_name,
        birthdate: req.body.birthdate,
        height_m: req.body.height_m,
        country: req.body.country,
        movies_id: req.body.movies_id
    }
    const response = await mongodb.getDatabase().db().collection("actors").replaceOne({_id: actorId}, actor);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the movie.")
    }
};

const deleteActors = async (req, res) => {
    //#swagger.tags=['Actors']
    const actorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("actors").deleteOne({_id: actorId});
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
    addActors,
    updateActors,
    deleteActors
}