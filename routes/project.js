const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')


router.post('/', auth, [check('name','The project must have a name').not().isEmpty()], projectController.createProject)

router.get('/', auth, projectController.getAllProjects)

router.put('/:id', auth, [check('name', 'The project must have a name').not().isEmpty()], projectController.updateProject)

router.delete('/:id', auth,  projectController.deleteProject)

module.exports= router