import projects from '@/projects.json'

export function getNamesProjects(): string[]{
  const namesProjects: string[] = []
  projects.forEach(project =>{
    namesProjects.push(project.slug)
  })
  return namesProjects
}