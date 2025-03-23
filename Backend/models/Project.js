const mongoose = require('mongoose');
const {Schema}=mongoose;

const roadmapStepSchema = new mongoose.Schema({
    step: String,
    difficulty: String
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: String,
        default: "Intermediate"
    },
    techStack: [{
        type: String
    }],
    roadmap: [roadmapStepSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    upvotes: { type: Number, default: 0 }   
});

module.exports = mongoose.model('Project', projectSchema); 