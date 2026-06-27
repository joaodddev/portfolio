export type Lang = 'java' | 'go' | 'kotlin'

export interface Project {
  id: string
  name: string
  lang: Lang
  tags: string[]
  desc: string
  url: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Event-Driven Banking',
    lang: 'java',
    tags: ['Java 21', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Docker'],
    desc: 'Sistema bancário em microsserviços com transferências assíncronas, idempotência e arquitetura orientada a eventos.',
    url: 'https://github.com/joaodddev',
    featured: true,
  },
  {
    id: '2',
    name: 'Telegram Promo Bot',
    lang: 'java',
    tags: ['Java 21', 'Spring Boot', 'H2', 'Telegram API'],
    desc: 'Bot que monitora e entrega promoções em tempo real via Telegram, com deduplicação e polling agendado.',
    url: 'https://github.com/joaodddev',
    featured: false,
  },
  {
    id: '3',
    name: 'Payment Processor',
    lang: 'go',
    tags: ['Go', 'Gin', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'],
    desc: 'Processador de pagamentos com filas, idempotência, DLQ e retry automático via Clean Architecture.',
    url: 'https://github.com/joaodddev',
    featured: true,
  },
  {
    id: '4',
    name: 'Go Auth Gateway',
    lang: 'go',
    tags: ['Go', 'Gin', 'JWT', 'Reverse Proxy', 'Docker'],
    desc: 'API Gateway com autenticação JWT e reverse proxy para centralizar auth em microsserviços.',
    url: 'https://github.com/joaodddev',
    featured: true,
  },
  // ── adicione novos projetos acima desta linha ──
]

export default projects