import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface Project {
  key: string;
  name: string;
}

interface ProjectFetcherProps {
  email: string;
  token: string;
  domain: string;
  setProjectKey: (key: string) => void;
  setMessage: (message: string) => void;
  setMessageClass: (className: string) => void;
}

export default function ProjectFetcher({ 
  email, 
  token, 
  domain, 
  setProjectKey, 
  setMessage, 
  setMessageClass 
}: ProjectFetcherProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('ALL');

  // Add "All Projects" option to the projects list
  const allProjectsOption: Project = { key: 'ALL', name: '🌐 All Projects' };

  useEffect(() => {
    if (!email || !token || !domain) return;

    setLoading(true);
    setMessage('Loading projects...');
    setMessageClass('text-blue-500');

    fetch(`http://localhost:5000/projects?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}&domain=${encodeURIComponent(domain)}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMessage(`Failed to load projects: ${data.error}`);
          setMessageClass('text-destructive');
        } else {
          // Add "All Projects" option at the beginning
          const projectsWithAll = [allProjectsOption, ...(data.projects || [])];
          setProjects(projectsWithAll);
          setMessage('Projects loaded successfully.');
          setMessageClass('text-success');
        }
      })
      .catch(err => {
        setMessage(`Failed to load projects: ${err.message}`);
        setMessageClass('text-destructive');
      })
      .finally(() => setLoading(false));
  }, [email, token, domain]);

  const handleChange = (value: string) => {
    setSelectedProject(value);
    setProjectKey(value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="project-select">Select Jira Project</Label>
      <div className="relative">
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        <Select value={selectedProject} onValueChange={handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.key} value={project.key}>
                {project.key === 'ALL' ? (
                  <span className="font-semibold text-primary">{project.name}</span>
                ) : (
                  `${project.name} (${project.key})`
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}