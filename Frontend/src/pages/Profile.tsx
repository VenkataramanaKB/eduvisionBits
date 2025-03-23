import React, { useEffect, useState } from "react";
import profileData from "./prog.json";
import Navbar from '../components/Navbar';

interface ProfileData {
  name: string;
  bio: string;
  location: string;
  website?: string;
  email: string;
  linkedin: string;
  github: string;
  gfg: string;
  codeforces: string;
  codechef: string;
  skills: string[];
  projects: { name: string; link: string }[];
}

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

interface GitHubStats {
  public_repos: number;
  languages: string[];
  username: string;
}

const LeetCodeStatsBox: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://leetcode-stats-api.herokuapp.com/Venkat")
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching LeetCode stats:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="w-full bg-[#161830] rounded-lg p-6 border border-primary/50">
        <div className="h-8 bg-primary/40 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-primary/30 rounded"></div>
          ))}
        </div>
      </div>
    );
    
  if (!stats)
    return (
      <div className="w-full bg-[#161830] rounded-lg p-6 border border-red-500/60">
        <p className="text-red-400 font-medium text-center">
          Failed to load LeetCode stats. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="w-full bg-[#161830] rounded-lg p-6 border border-primary/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          LeetCode Statistics
        </h2>
        <div className="px-4 py-1.5 bg-primary text-white rounded-md text-sm font-bold">
          Rank #{stats.ranking}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-[#0F0F1F] p-4 rounded-lg border border-primary/30">
            <div className="text-sm text-primary-light font-medium mb-1">Total Solved</div>
            <div className="text-2xl font-bold text-white">
              {stats.totalSolved}
              <span className="text-sm text-white ml-1">
                / {stats.totalQuestions}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#0F0F1F] p-3 rounded-lg border border-green-500/50">
              <div className="text-sm text-green-400 mb-1 font-semibold">Easy</div>
              <div className="text-lg font-bold text-white">
                {stats.easySolved}
              </div>
              <div className="text-xs text-green-400">/ {stats.totalEasy}</div>
            </div>
            <div className="bg-[#0F0F1F] p-3 rounded-lg border border-yellow-500/50">
              <div className="text-sm text-yellow-400 mb-1 font-semibold">Medium</div>
              <div className="text-lg font-bold text-white">
                {stats.mediumSolved}
              </div>
              <div className="text-xs text-yellow-400">
                / {stats.totalMedium}
              </div>
            </div>
            <div className="bg-[#0F0F1F] p-3 rounded-lg border border-red-500/50">
              <div className="text-sm text-red-400 mb-1 font-semibold">Hard</div>
              <div className="text-lg font-bold text-white">
                {stats.hardSolved}
              </div>
              <div className="text-xs text-red-400">/ {stats.totalHard}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#0F0F1F] p-4 rounded-lg border border-blue-500/50">
            <div className="text-sm text-blue-400 mb-1 font-semibold">Acceptance Rate</div>
            <div className="text-2xl font-bold text-white">
              {stats.acceptanceRate}%
            </div>
          </div>
          <div className="bg-[#0F0F1F] p-4 rounded-lg border border-purple-500/50">
            <div className="text-sm text-purple-400 mb-1 font-semibold">
              Contribution Points
            </div>
            <div className="text-2xl font-bold text-white">
              {stats.contributionPoints}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GitHubStatsBox: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const username = "VenkataramanaKB"; // Replace with your GitHub username

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userData = await userResponse.json();

        // Fetch repositories to get languages
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const reposData = await reposResponse.json();

        // Get unique languages from repositories
        const languages = Array.from(
          new Set(
            reposData
              .map((repo: any) => repo.language)
              .filter((lang: string | null) => lang !== null)
          )
        ) as string[];

        setStats({
          public_repos: userData.public_repos,
          languages,
          username: userData.login,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading)
    return (
      <div className="w-full bg-[#161830] rounded-lg p-6 border border-secondary/50">
        <div className="h-8 bg-secondary/40 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-secondary/30 rounded"></div>
          ))}
        </div>
      </div>
    );
    
  if (!stats)
    return (
      <div className="w-full bg-[#161830] rounded-lg p-6 border border-red-500/60">
        <p className="text-red-400 font-medium text-center">
          Failed to load GitHub stats. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="w-full bg-[#161830] rounded-lg p-6 border border-secondary/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          GitHub Statistics
        </h2>
        <a
          href={`https://github.com/${stats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 bg-secondary text-white rounded-md text-sm font-bold"
        >
          @{stats.username}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#0F0F1F] p-4 rounded-lg border border-secondary/30">
          <div className="text-sm text-secondary-light font-medium mb-1">Total Repositories</div>
          <div className="text-2xl font-bold text-white">
            {stats.public_repos}
          </div>
        </div>

        <div className="bg-[#0F0F1F] p-4 rounded-lg border border-secondary/30">
          <div className="text-sm text-secondary-light font-medium mb-1">Languages Used</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {stats.languages.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary/30 text-white rounded-md text-sm font-medium"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard: React.FC<{profile: ProfileData}> = ({ profile }) => {
  return (
    <div className="w-full bg-[#161830] rounded-lg p-8 mb-8 border border-primary/50 shadow-md">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">
            {profile.name}
          </h1>
          <p className="text-white text-lg mb-3">{profile.bio}</p>
          <p className="text-white flex items-center">
            <span className="mr-2">📍</span> {profile.location}
          </p>
        </div>
        
        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent text-white rounded-md text-sm font-bold border border-white/70 hover:border-white shadow-md transition-all duration-300"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
};

const SkillsCard: React.FC<{skills: string[]}> = ({ skills }) => {
  return (
    <div className="w-full bg-[#161830] rounded-lg p-6 border border-primary/50 shadow-md">
      <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
        Skills
      </h2>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-[#0F0F1F] text-white rounded-md text-sm font-medium border border-primary/40 shadow-sm hover:border-primary/80 hover:bg-[#141428] transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectsCard: React.FC<{projects: {name: string; link: string}[]}> = ({ projects }) => {
  return (
    <div className="w-full bg-[#161830] rounded-lg p-6 border border-primary/50 shadow-md">
      <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
        Projects
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-[#0F0F1F] rounded-md border border-secondary/40 shadow-sm hover:border-secondary/80 hover:bg-[#141428] transition-all duration-300"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/40 mr-3">
              🔗
            </div>
            <div className="text-white font-medium">
              {project.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const ContactsCard: React.FC<{profile: ProfileData}> = ({ profile }) => {
  const contacts = [
    { icon: "📧", label: "Email", link: `mailto:${profile.email}`, value: profile.email },
    { icon: "🔗", label: "LinkedIn", link: profile.linkedin, value: "LinkedIn Profile" },
    { icon: "🐙", label: "GitHub", link: profile.github, value: "GitHub Profile" },
    { icon: "📗", label: "GeeksforGeeks", link: profile.gfg, value: "GFG Profile" },
    { icon: "💡", label: "Codeforces", link: profile.codeforces, value: "Codeforces Profile" },
    { icon: "🏆", label: "CodeChef", link: profile.codechef, value: "CodeChef Profile" }
  ];

  return (
    <div className="space-y-4">
      {contacts.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-[#0F0F1F] rounded-md border border-gray-700 shadow-sm"
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary/30 mr-3">
            {item.icon}
          </div>
          <div>
            <div className="text-gray-300 text-xs">{item.label}</div>
            <div className="text-white text-sm font-medium">
              {item.value}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

const Profile: React.FC = () => {
  const profile = profileData as ProfileData;
  
  return (
    <div className="min-h-screen bg-[#0a0d1d]">
      <Navbar />
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <ProfileCard profile={profile} />
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Skills and Contact */}
          <div className="lg:col-span-4 space-y-8">
            {/* Skills Section */}
            <SkillsCard skills={profile.skills} />
            
            {/* Contact Section */}
            <div className="bg-[#161830] rounded-lg p-6 border border-secondary/50 shadow-md">
              <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
                Contact & Profiles
              </h2>
              <ContactsCard profile={profile} />
            </div>
          </div>
          
          {/* Right Column - Projects and Stats */}
          <div className="lg:col-span-8 space-y-8">
            {/* Projects Section */}
            <ProjectsCard projects={profile.projects} />
            
            {/* Stats Sections */}
            <GitHubStatsBox />
            <LeetCodeStatsBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
