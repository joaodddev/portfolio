// src/app/page.tsx
// Página principal. É um Server Component — roda no servidor/build,
// lê os projetos do arquivo .ts e passa para os componentes filhos.

import Hero from '@/components/Hero'
import ProjectsSection from '@/components/ProjectsSection'
import projects from '@/data/projects'

export default function Home() {
  return (
    <main className="page">
      {/* Hero — nome, stack pills, links sociais */}
      <Hero />

      {/* Divisor */}
      <div className="divider fade-in" style={{ animationDelay: '340ms' }} />

      {/* Projetos com filtros */}
      <ProjectsSection projects={projects} />

      {/* Footer */}
      <footer className="footer fade-in" style={{ animationDelay: '600ms' }}>
        João Victor &copy; 2025
      </footer>
    </main>
  )
}