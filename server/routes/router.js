const express = require('express')
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller')

//GET route for Home Page
route.get('/', services.homeRoutes)
//GET route for Adding New User
route.get('/add-user', services.add_user)
//GET route for Updating A User
route.get('/update-user', services.update_user)

//API Routes
route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)

module.exports = route 