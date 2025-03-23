const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateProjects = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const systemPrompt = `Generate 3 programming projects based on the following prompt: "${prompt}".
        For each project, provide:
        1. Title (should be unique and descriptive)
        2. Description (detailed but concise explanation)
        3. Tech Stack (as array of technologies)
        4. Difficulty Level (Beginner/Intermediate/Advanced)
        5. Roadmap (5 steps with difficulty level for each step)
        
        Return the response in this exact JSON format:
        [
          {
            "title": "Project Name",
            "description": "Project Description",
            "techStack": ["Tech1", "Tech2"],
            "difficultyLevel": "Beginner",
            "roadmap": [
              {"step": "Step 1", "difficulty": "Beginner"},
              {"step": "Step 2", "difficulty": "Beginner"},
              {"step": "Step 3", "difficulty": "Intermediate"},
              {"step": "Step 4", "difficulty": "Intermediate"},
              {"step": "Step 5", "difficulty": "Advanced"}
            ]
          }
        ]`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();
        
        try {
            // Parse the response
            const parsedData = JSON.parse(text);
            
            // Validate and ensure all required fields are present
            const validatedData = parsedData.map(project => {
                return {
                    title: project.title || "Untitled Project",
                    description: project.description || "No description available",
                    difficultyLevel: project.difficultyLevel || "Intermediate",
                    techStack: Array.isArray(project.techStack) ? project.techStack : [],
                    roadmap: Array.isArray(project.roadmap) ? project.roadmap.map(step => ({
                        step: step.step || "Untitled Step",
                        difficulty: step.difficulty || "Intermediate"
                    })) : []
                };
            });
            
            return validatedData;
        } catch (parseError) {
            console.error("Parse error:", parseError);
            throw new Error('Failed to parse AI response');
        }
    } catch (error) {
        console.error("Gemini API error:", error);
        throw error;
    }
};

module.exports = { generateProjects }; 