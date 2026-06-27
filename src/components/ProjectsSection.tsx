'use client'

import { useState } from 'react'
import type { Project, Lang } from '@/data/projects'
import ProjectCard from './ProjectCard'

const FILTERS = [
  { label: 'Todos',  value: 'all',    cls: '' },
  { label: 'Java',   value: 'java',   cls: 'f-java' },
  { label: 'Go',     value: 'go',     cls: 'f-go' },
  { label: 'Kotlin', value: 'kotlin', cls: 'f-kotlin' },
  { label: 'Spring', value: 'spring', cls: 'f-spring' },
  { label: 'Kafka',  value: 'kafka',  cls: 'f-kafka' },
  { label: 'Docker', value: 'docker', cls: 'f-docker' },
] as const

type FilterValue = (typeof FILTERS)[number]['value']

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<FilterValue>('all')

  function isDimmed(p: Project): boolean {
    if (active === 'all') return false
    if (active === 'java' || active === 'go' || active === 'kotlin') return p.lang !== (active as Lang)
    return !p.tags.some((t) => t.toLowerCase().includes(active))
  }

  return (
    <section className="projects-section">
      <div className="projects-header">
        <span className="section-label fade-in" style={{ animationDelay: '400ms' }}>Projetos</span>
      </div>
      <div className="filters fade-in" style={{ animationDelay: '440ms' }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={['filter-chip', f.cls, active === f.value ? 'active' : ''].filter(Boolean).join(' ')}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="projects-grid fade-in" style={{ animationDelay: '500ms' }}>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} dimmed={isDimmed(p)} />
        ))}
      </div>
    </section>
  )
}