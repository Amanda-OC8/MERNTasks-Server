const Project = require('../models/Project')
const { validationResult } = require('express-validator')


exports.createProject = async (req, res) => {

    //Check the possible errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        //Create a new project
        const project = new Project(req.body)

        //Save the creator using JWT
        project.owner = req.user.id

        //Save the project
        project.save()
        res.json(project)

    } catch (error) {
        console.log(error)
        res.status(500).send('An error happened')
    }
}

//Get all the user's projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.id })
        res.json({ projects })
    } catch (error) {
        res.status(500).send('An error happened')
    }
}


//Edit a project
exports.updateProject = async (req, res) => {

    //Check the possible errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //Get the project info
    const { name} = req.body
    const newProject = {}
    //Change the name
    name ? newProject.name = name : null

    try {
        //Check the ID
        let project = await Project.findById(req.params.id)
        
        //Check the creator
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).send('Forbbiden action')
        }

        //Update
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true })
        
        res.json(project)

    } catch (error) {
        res.status(500).send('An error happened')
    }
}

//Delete a project
exports.deleteProject = async (req, res) => {

    try {
        //Check the ID
        let project = await Project.findById(req.params.id)

        //Check the creator
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).send('Forbbiden action')
        }

        //Update
        project = await Project.findByIdAndDelete({ _id: req.params.id })

        res.json({msg: 'Project deleted'})

    } catch (error) {
        res.status(500).send('An error happened')
    }
}