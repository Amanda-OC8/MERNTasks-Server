const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')


router.post('/', auth, [
    check('name', 'The task must have a name').not().isEmpty(),
    check('project', 'The task must have an associated project').not().isEmpty()
], taskController.createTask)

router.get('/', auth, taskController.getTaskProject)

router.put('/:id', auth, taskController.updateTask)

router.delete('/:id', auth,  taskController.deleteTask)

module.exports= router