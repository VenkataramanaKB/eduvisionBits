// API Configuration
const API_BASE_URL = 'http://localhost:5001/api';

// Default request options
const defaultOptions = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  mode: 'cors' as RequestMode
};

// Helper function to handle API errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Try to parse error as JSON
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
    } catch (e) {
      // If JSON parsing fails, use status text
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  }
  
  return response.json();
};

// Helper function for API requests with error handling
const apiRequest = async (url: string, options: RequestInit) => {
  console.log(`Making request to: ${url}`, options);
  
  try {
    const response = await fetch(url, options);
    console.log(`Received response from: ${url}`, response.status);
    return await handleResponse(response);
  } catch (error) {
    console.error('API request error details:', error);
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      // Network error - server might be down or CORS issue
      console.error('Network error details:', {
        url,
        method: options.method,
        error
      });
      
      // For development & testing only - return mock data if API is unavailable
      if (url.includes('/projects/generate')) {
        console.log('Returning mock data for projects/generate');
        return getMockProjects();
      }
      
      throw new Error('Network error: Unable to connect to the server. Please check if the server is running.');
    }
    throw error;
  }
};

// Mock data for development purposes
const getMockProjects = () => {
  return [
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
};

// API endpoints
export const API = {
  // Projects
  projects: {
    generate: async (prompt: string) => {
      return apiRequest(`${API_BASE_URL}/projects/generate`, {
        method: 'POST',
        ...defaultOptions,
        body: JSON.stringify({ prompt }),
      });
    },
    
    save: async (project: any) => {
      return apiRequest(`${API_BASE_URL}/projects/save`, {
        method: 'POST',
        ...defaultOptions,
        body: JSON.stringify(project),
      });
    },
    
    getSaved: async () => {
      return apiRequest(`${API_BASE_URL}/projects/saved`, {
        method: 'GET',
        ...defaultOptions,
      });
    }
  }
};

export default API; 