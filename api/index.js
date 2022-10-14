const { addTodo, getTodoByUserId, modifyTodoById } = require('./controller/todos')
const { createUser, signUser, modifyNicknameByUserId } = require('./controller/users')
require('dotenv').config()
const { PORT, SALTROUND } = process.env
const fastify = require('fastify')({
    logger: true
})
fastify.register(require('@fastify/formbody'))
const pool = require('./db')
const bcrypt = require('bcrypt')
const address = `http://localhost:${PORT}/`


fastify.post('/todo/:userId', (req, res) => addTodo(req, res, pool))
fastify.get('/todo/:userId', (req, res) => getTodoByUserId(req, res, pool))
fastify.put('/todo/:id', (req, res) => modifyTodoById(req, res, pool))

fastify.post('/user', (req, res) => createUser(req, res, pool, bcrypt, parseInt(SALTROUND)))
fastify.post('/sign-user', (req, res) => signUser(req, res, pool, bcrypt, parseInt(SALTROUND)))
fastify.patch('/user/:id', (req, res) => modifyNicknameByUserId(req, res, pool))




fastify.listen({ port: process.env.PORT }, function (err, address = address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`Server is running on ${address}`)
})