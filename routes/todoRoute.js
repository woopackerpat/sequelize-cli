const express = require('express')
const router = express.Router()
const todoControllers = require('../controllers/todoController')
const userMiddleware = require('../middlewares/user')
const authenticate = require('../middlewares/authenticate')


router.post('/', authenticate ,todoControllers.createTodo)
router.get('/', authenticate ,todoControllers.getAllTodo)
router.get('/:id', authenticate,todoControllers.getTodoById)
router.put('/:id', authenticate,todoControllers.updateTodo)
router.delete('/:id', authenticate,todoControllers.deleteTodo)


module.exports = router;