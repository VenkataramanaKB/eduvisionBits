const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { generateProjects } = require('../utils/gemini');

router.post('/generate', async (req, res) => {
    try {
        console.log('Generate route accessed, body:', req.body);
        const { prompt } = req.body;
        if (!prompt) {
            console.log('No prompt provided');
            return res.status(400).json({ error: 'Prompt is required' });
        }
        
        console.log('Generating projects for prompt:', prompt);
        // If generateProjects is causing issues, return some mock data for testing
        try {
            const projects = await generateProjects(prompt);
            console.log('Generated projects successfully');
            res.json(projects);
        } catch (genError) {
            console.error('Error in generateProjects:', genError);
            
            // Return mock data for testing
            const mockProjects = [
                {
                    title: "Personal Portfolio Website",
                    description: "Create a responsive portfolio website to showcase your skills and projects.",
                    difficultyLevel: "Beginner",
                    techStack: ["HTML", "CSS", "JavaScript"],
                    roadmap: [
                        { step: "Design website layout and wireframes", difficulty: "Easy" },
                        { step: "Create HTML structure for pages", difficulty: "Easy" },
                        { step: "Style with CSS and add responsiveness", difficulty: "Medium" },
                        { step: "Add JavaScript for interactivity", difficulty: "Medium" },
                        { step: "Deploy to a hosting platform", difficulty: "Easy" }
                    ]
                },
                {
                    title: "Task Management App",
                    description: "Build a web application for tracking tasks and managing to-do lists.",
                    difficultyLevel: "Intermediate",
                    techStack: ["React", "Node.js", "MongoDB"],
                    roadmap: [
                        { step: "Set up React project and design UI", difficulty: "Medium" },
                        { step: "Create components for task display and creation", difficulty: "Medium" },
                        { step: "Implement state management", difficulty: "Hard" },
                        { step: "Set up Node.js backend with Express", difficulty: "Medium" },
                        { step: "Create MongoDB database and schemas", difficulty: "Medium" },
                        { step: "Implement API endpoints", difficulty: "Hard" },
                        { step: "Connect frontend to backend", difficulty: "Medium" },
                        { step: "Add authentication", difficulty: "Hard" }
                    ]
                }
            ];
            
            console.log('Returning mock data instead');
            res.json(mockProjects);
        }
    } catch (error) {
        console.error('Route Error:', error);
        res.status(500).json({ 
            error: 'Error generating projects',
            details: error.message 
        });
    }
});

router.post('/save', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Error saving project' });
    }
});

router.get('/saved', async (req, res) => {
    try {
        const projects = await Project.find()
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching saved projects' });
    }
});

router.get('/roadmap', async (req, res) => {
    try {
        const projects = await Project.find()
            .select('title roadmap')
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching project roadmaps' });
    }
});

module.exports = router; 