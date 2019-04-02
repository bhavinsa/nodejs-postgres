const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dvdrental',
    password: 'admin',
    port: 5432
})

const getActors = (request, response) => {
    pool.query('SELECT * FROM actor ORDER BY actor_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateActor = (request, response) => {
    // console.log(JSON.stringify(request.params));
    const id = parseInt(request.params.id)
    const {
        first_name,
        last_name
    } = request.body


    pool.query(
        'UPDATE actor SET first_name = $1, last_name = $2 WHERE actor_id = $3',
        [first_name, last_name, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const getActorById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM actor WHERE actor_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const deleteActor = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM actor WHERE actor_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

const createActor = (request, response) => {
    const {
        first_name,
        last_name
    } = request.body

    pool.query('INSERT INTO actor (first_name, last_name) VALUES ($1, $2) RETURNING actor_id', [first_name, last_name], (error, result) => {
        if (error) {
            throw error
        }
        //console.log(JSON.stringify(result));
        response.status(201).send(`User added with ID: ${result.rows[0].actor_id}`)
    })
}

module.exports = {
    getActors,
    updateActor,
    getActorById,
    deleteActor,
    createActor
}