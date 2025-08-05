const express = require('express')
const TaskRouter = express.Router()
const { get_tasks, create_task, edit_task, del_task, get_task } = require('../controllers/TaskController')
const authMiddleware = require('../Middleware/auth')

TaskRouter.use(authMiddleware)

TaskRouter.route('/').get(get_tasks).post(create_task)
TaskRouter.route('/:id').get(get_task).patch(edit_task).delete(del_task)


module.exports = TaskRouter