import {ProjectCard, type CardProject} from '@/components/project-card'

export function ProjectGrid({projects}: {projects: CardProject[]}) {
  return (
    <ul className="mt-6 grid gap-6 sm:grid-cols-2">
      {projects.map((p) => (
        <li key={p._id}>
          <ProjectCard project={p} />
        </li>
      ))}
    </ul>
  )
}
