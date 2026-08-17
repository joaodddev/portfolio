# Portfólio — João Victor Macedo Neves

Portfólio pessoal construído com **Next.js 15**, **TypeScript** e **CSS custom properties** — sem bibliotecas de UI, sem frameworks de componentes, sem atalhos.

**Live:** [portfolio-nevvesdev.vercel.app](https://portfolio-nevvesdev.vercel.app/)

---

## Stack

- **Next.js 15** — App Router, Server Components
- **TypeScript** — strict mode
- **CSS** — vanilla, custom properties, sem Tailwind
- **Vercel** — CI/CD a cada push para `main`

## Decisões de arquitetura

**Server Components por padrão.** `page.tsx` lê `projects.ts` em build time e passa dados como props — sem fetching no cliente, sem loading states, sem useEffect.

**Client Component apenas onde necessário.** `ProjectsSection.tsx` é o único componente com `'use client'`, isolado para onde a interatividade (estado de filtro) realmente existe.

**Única fonte de verdade para conteúdo.** Todos os projetos vivem em `src/data/projects.ts`. Adicionar um projeto significa editar um arquivo e fazer push — Vercel rebuilda em ~30s.

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx          # root layout, metadata, fonte Inter
│   ├── page.tsx            # página home (Server Component)
│   └── globals.css         # todos os estilos — um arquivo, sem módulos
├── components/
│   ├── Hero.tsx            # nome, tech pills, ícones sociais
│   ├── ProjectsSection.tsx # estado de filtro (Client Component)
│   └── ProjectCard.tsx     # card individual de projeto
└── data/
    └── projects.ts         # ← único arquivo que você edita para adicionar projetos
```
