require('dotenv').config()
const { PORT, SALTROUND, SECRET } = process.env
const cors = require('@fastify/cors')
const formbody = require('@fastify/formbody')
const fastify = require('fastify')({
    logger: true
})
const pool = require('./db')
const bcrypt = require('bcrypt')
const { addTodo, getTodoByUserId, modifyTodoById } = require('./controller/todos')
const { createUser, signUser, modifyNicknameByUserId } = require('./controller/users')
const address = `http://localhost:${PORT}/`


fastify.register(cors, {
    origin: '*'
})
fastify.register(formbody)
fastify.post('/todo/:userId', (req, res) => addTodo(req, res, pool))
fastify.get('/todo/:userId', (req, res) => getTodoByUserId(req, res, pool))
fastify.put('/todo/:id', (req, res) => modifyTodoById(req, res, pool))

fastify.post('/user', (req, res) => createUser(req, res, pool, bcrypt, parseInt(SALTROUND)))
fastify.post('/sign-user', (req, res) => signUser(req, res, pool, bcrypt))
fastify.patch('/user/:id', (req, res) => modifyNicknameByUserId(req, res, pool))




fastify.listen({ port: process.env.PORT }, function (err) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`Server is running on ${address}`)
})