const knex = require('../connection');

function getAllMovies() {
    return knex('movies').select('*')
}

function getSingleMovie(id) {
    return knex('movies')
     .select('*')
     .where({id: parseInt(id)})
}

function addMovie(movie) {
  return knex('movies')
    .insert(movie)
    .then(inserted => {
        return knex('movies')
        .where({id: inserted[0]})
    })
}

module.exports = {
    getAllMovies,
    getSingleMovie,
    addMovie
};