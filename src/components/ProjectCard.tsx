import type { Project } from '@/data/projects'

const MAX_TAGS = 4

interface Props {
  project: Project
  dimmed: boolean
}

export default function ProjectCard({ project, dimmed }: Props) {
  const { name, lang, tags, desc, url, featured } = project
  const visibleTags = tags.slice(0, MAX_TAGS)
  const overflow = tags.length - MAX_TAGS
  const classes = ['card', `lang-${lang}`, featured ? 'featured' : '', dimmed ? 'dimmed' : ''].filter(Boolean).join(' ')
  const langLabel = lang === 'java' ? 'Java' : lang === 'go' ? 'Go' : 'Kotlin'

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={classes}>
      <span className={`card-lang-pill ${lang}`}>{langLabel}</span>
      <p className="card-title">{name}</p>
      <p className="card-desc">{desc}</p>
      <div className="card-tags">
        {visibleTags.map((tag) => (
          <span key={tag} className="card-tag">{tag}</span>
        ))}
        {overflow > 0 && <span className="card-tag">+{overflow}</span>}
      </div>
      <div className="card-footer">
        <span className="card-link">GitHub →</span>
      </div>
    </a>
  )
}