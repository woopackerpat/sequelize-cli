const express = require('express')
const router = express.Router()
const todoControllers = require('../controllers/todoController')
const userMiddleware = require('../middlewares/user')


router.post('/', userMiddleware.getUserById ,todoControllers.createTodo)
router.get('/', todoControllers.getAllTodo)
router.get('/:id', todoControllers.getTodoById)
router.put('/:id', todoControllers.updateTodo)
router.delete('/:id', todoControllers.deleteTodo)


module.exports = router;