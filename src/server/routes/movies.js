const Router = require('koa-router');
const queries = require('../db/queries/movies');

const router = new Router()
const BASE_URL = `/api/v1/movies`

router.get(BASE_URL, async (ctx) => {
    try {
        const movies = await queries.getAllMovies();
        ctx.body = {
            status: 'success',
            data: movies
        };
    } catch (err) {
        console.log(err);
    }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const movie = await queries.getSingleMovie(ctx.params.id)
        if (movie.length) {
            ctx.body = {
                status: 'success',
                data: movie
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That movie does not exist.'
            };
        }

    } catch (err) {
        console.log(err)
    }


})

router.post(`${BASE_URL}`, async (ctx) => {
    try {
        const movie = await queries.addMovie(ctx.request.body);
        if (movie.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: movie
            } 
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            }
        }
    } catch(error) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: error.message || 'Sorry, an error has occurred.'
        }
        console.log(error)
    }
    
})
module.exports = router;