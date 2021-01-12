const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')


exports.createTask = async (req, res) => {

    //Check the possible errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        //Get the project id and check if exists
        const { project } = req.body

        const existedProject = await Project.findById(project)
        if (!existedProject) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        //Check the owner is the logged user and added to the task
        if (existedProject.owner.toString() !== req.user.id) {
            return res.status(401).send('Forbbiden action')
        }


        //Create a new task
        const task = new Task(req.body)

        //Save the creator using JWT
        task.owner = req.user.id
        //Save the project
        await task.save()
        res.json(task)

    } catch (error) {
        console.log(error)
        res.status(500).send('An error happened')
    }


}

//Get all the task's project
exports.getTaskProject = async (req, res) => {

    try {
        //Get the project id and check if exists
        const { project } = req.query

        const existedProject = await Project.findById(project)
        if (!existedProject) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        //Check the owner is the logged user and added to the task
        if (existedProject.owner.toString() !== req.user.id) {
            return res.status(401).send('Forbbiden action')
        }

        const tasks = await Task.find({ project }).sort({ createdAt: -1 })
        res.json({ tasks })
    } catch (error) {
        res.status(500).send('An error happened')
    }
}


//Edit a project
exports.updateTask = async (req, res) => {

    //Check the possible errors
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //Get the project id and the task info
        const { project, name, completed } = req.body

        //Check if the task exists
        let existedTask = await Task.findById(req.params.id)
        if (!existedTask) {
            return res.status(404).json({ msg: 'Task not found' })
        }
        
        //Check the project
        const existedProject = await Project.findById(project)
        //Check the owner is the logged user and added to the task
        if (existedProject.owner.toString() !== req.user.id) {
            return res.status(401).send('Forbbiden action')
        }

        //Get the new information
        const newTask = {}
        //Change the name and/or status
        newTask.name = name 
        newTask.completed = completed 
      
        //Update
        task = await Task.findByIdAndUpdate({ _id: req.params.id }, newTask , { new: true })

        res.json(task)

    } catch (error) {
        res.status(500).send('An error happened')
    }
}

//Delete a task
exports.deleteTask = async (req, res) => {

    try {
        //Check the ID
        let task = await Task.findById(req.params.id)

        //Check the creator
        if (task.owner.toString() !== req.user.id) {
            return res.status(401).send('Forbbiden action')
        }

        //Update
        task = await Task.findByIdAndDelete({ _id: req.params.id })

        res.json({msg: 'Task deleted'})

    } catch (error) {
        res.status(500).send('An error happened')
    }
}