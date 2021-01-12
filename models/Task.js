const mongoose = require('mongoose')


const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    completed: {
        type: Boolean,
        default: false

    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})


module.exports = mongoose.model('Task', TaskSchema)