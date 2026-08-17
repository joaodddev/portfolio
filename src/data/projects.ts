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
    name: 'Message Broker from Scratch',
    lang: 'go',
    tags: ['Go', 'Direct/Fanout/Topic Exchange', 'Regex Routing', 'Event-Driven'],
    desc: 'Message broker implementado do zero com suporte a múltiplos tipos de exchange (Direct, Fanout, Topic) e roteamento baseado em regex. Demonstra compreensão profunda de padrões de pub/sub e arquitetura de mensageria.',
    url: 'https://github.com/nevvesdev/message-broker',
    featured: true,
  },
  {
    id: '2',
    name: 'Resilience Toolkit',
    lang: 'go',
    tags: ['Go', 'Circuit Breaker', 'Bulkhead', 'Retry', 'Clean Architecture', 'DDD'],
    desc: 'Toolkit de resiliência com Circuit Breaker, Bulkhead e Retry policies. Inclui dashboard SSE e exporter Prometheus. Arquitetura limpa demonstrando princípios de DDD.',
    url: 'https://github.com/nevvesdev/resilience-toolkit',
    featured: true,
  },
  {
    id: '3',
    name: 'Idempotency Key Middleware',
    lang: 'go',
    tags: ['Go', 'HTTP Middleware', 'Redis', 'Distributed Locking', 'Lua Scripts', 'Prometheus'],
    desc: 'Middleware HTTP com suporte a idempotência distribuída via Redis com scripts Lua. Inclui armazenamento em memória e Redis, métricas Prometheus isoladas e exemplo com Docker Compose.',
    url: 'https://github.com/nevvesdev/idempotency-key-middleware',
    featured: true,
  },
  {
    id: '4',
    name: 'High Performance Ledger',
    lang: 'go',
    tags: ['Go', 'Event Sourcing', 'WAL', 'Snapshots', 'Benchmarks'],
    desc: 'Sistema de ledger com Event Sourcing, WAL append-only e snapshotting. Suporta múltiplos codecs (JSON, MessagePack, Protobuf) com benchmarks de performance.',
    url: 'https://github.com/nevvesdev/high-perf-ledger',
    featured: true,
  },
  {
    id: '5',
    name: 'Distributed Rate Limiter',
    lang: 'go',
    tags: ['Go', 'Redis', 'Lua Scripts', 'Sliding Window', 'Middleware'],
    desc: 'Rate limiter distribuído com algoritmo de sliding window via Redis e Lua. Middleware plugável com testes de concorrência.',
    url: 'https://github.com/nevvesdev/distributed-rate-limiter',
    featured: true,
  },
  {
    id: '6',
    name: 'Distributed Order Saga',
    lang: 'go',
    tags: ['Go', 'Ruby', 'Saga Pattern', 'Choreography', 'Transactional Outbox', 'OpenTelemetry', 'Jaeger'],
    desc: 'Orquestração de saga distribuída em polyglot (Go + Ruby) com padrão choreography, Transactional Outbox e observabilidade via OpenTelemetry/Jaeger.',
    url: 'https://github.com/nevvesdev/distributed-order-saga',
    featured: true,
  },
  {
    id: '7',
    name: 'Orchestrated Order Saga',
    lang: 'go',
    tags: ['Go', 'Kafka', 'Saga Pattern', 'Orchestration', 'State Machine'],
    desc: 'Saga orquestrada centralmente em Go com orquestrador dedicado, topics Kafka para commands/replies e máquina de estados completa.',
    url: 'https://github.com/nevvesdev/orchestrated-order-saga',
    featured: false,
  },
  {
    id: '8',
    name: 'Schedule Hub',
    lang: 'java',
    tags: ['Java', 'Spring Boot', 'Microsservices', 'Monorepo'],
    desc: 'Plataforma multiestabelecimento para gerenciamento de agendamentos de serviços.',
    url: 'https://github.com/nevvesdev/schedulehub',
    featured: true,
  },
  {
    id: '9',
    name: 'Credit Score Engine',
    lang: 'kotlin',
    tags: ['Kotlin', 'Spring Boot', 'JWT', 'MockK', 'OpenAPI'],
    desc: 'Motor de cálculo de score de crédito com autenticação JWT, testes com MockK e documentação OpenAPI.',
    url: 'https://github.com/nevvesdev/credit-score-engine',
    featured: false,
  },
  {
    id: '10',
    name: 'FX Rate & Currency Exchange API',
    lang: 'kotlin',
    tags: ['Kotlin', 'Spring Boot', 'Clean Architecture', 'Redis', 'Flyway'],
    desc: 'API de taxas de câmbio com arquitetura limpa, integração com Open Exchange Rates, cache Redis e migrations Flyway.',
    url: 'https://github.com/nevvesdev/fx-currency-exchange',
    featured: false,
  },
  {
    id: '11',
    name: 'Payment Gateway Orchestrator',
    lang: 'java',
    tags: ['Java 21', 'Spring Boot', 'Kafka', 'Redis', 'Resilience4j', 'Testcontainers'],
    desc: 'Orquestrador de gateway de pagamentos com Kafka, Redis para idempotência, Resilience4j e testes com Testcontainers.',
    url: 'https://github.com/nevvesdev/payment-gateway-orchestrator',
    featured: true,
  },
  {
    id: '12',
    name: 'Telegram Vagas Bot',
    lang: 'java',
    tags: ['Java 21', 'Spring Boot', 'H2', 'Telegram API', 'Web Scraping'],
    desc: 'Bot Telegram que monitora e entrega vagas de emprego em tempo real com deduplicação e polling agendado.',
    url: 'https://github.com/nevvesdev/vagas-bot',
    featured: false,
  },
  {
    id: '13',
    name: 'Settlement Engine',
    lang: 'java',
    tags: ['Java 21', 'Spring Boot', 'Clean Architecture', 'Indempotência', 'ACID'],
    desc: 'Motor de liquidação de transações financeiras com garantia de consistência ACID e idempotência.',
    url: 'https://github.com/nevvesdev/settlement-engine',
    featured: false,
  },
  {
    id: '14',
    name: 'Rate Limiter',
    lang: 'java',
    tags: ['Java 21', 'Spring Boot', 'Rate Limiter', 'Token Bucket', 'Sliding Window'],
    desc: 'Rate Limiter com Token Bucket e Sliding Window.',
    url: 'https://github.com/nevvesdev/rate-limiter',
    featured: false,
  },
  {
    id: '15',
    name: 'Credit Approval (SAGA Pattern)',
    lang: 'kotlin',
    tags: ['Kotlin', 'Spring Boot', 'Clean Architecture', 'SAGA Pattern', 'Redis', 'Flyway'],
    desc: 'Projeto que implementa o padrão Saga (orquestrada) aplicado a um fluxo de aprovação de crédito e KYC — ScoreCheck → FraudCheck → CreditLimitReserve → Approve/Reject.',
    url: 'https://github.com/nevvesdev/credit-approval-saga',
    featured: true,
  },
  {
    id: '16',
    name: 'Serverless Order Processing',
    lang: 'go',
    tags: ['Go', 'AWS', 'Lambda', 'Clean Architeture'],
    desc: 'Projeto desenvolvido para estudo de arquitetura Serverless (AWS Lambda) utilizando Go.',
    url: 'https://github.com/nevvesdev/serverless-order-processing',
    featured: true,
  },
  {
    id: '17',
    name: 'CQRS Pattern',
    lang: 'java',
    tags: ['Java 21', 'Spring Boot', 'Microsservices', 'CQRS Pattern', 'Transactional Outbox', 'CDC'],
    desc: 'Implementação dos padrões CQRS, Transactional Outbox e CDC com dois microsserviços em Spring Boot 3.0 + Java 21.',
    url: 'https://github.com/nevvesdev/cqrs-pattern',
    featured: true,
  },
  {
    id: '18',
    name: 'Interbank Transfer Service',
    lang: 'kotlin',
    tags: ['Kotlin', 'Spring Boot', 'Clean Architecture', 'gRPC'],
    desc: 'Serviço de transferência interbancária com Kotlin + Spring Boot + gRPC.',
    url: 'https://github.com/nevvesdev/interbank-transfer-service',
    featured: false,
  },
  {
    id: '19',
    name: 'Distributed Lock Manager',
    lang: 'go',
    tags: ['Go', 'Loa', 'Redis', 'Heartbeat', 'Fencing Token'],
    desc: 'Gerenciador de locks distribuídos implementado em Go com Redis, scripts Lua atômicos, fencing tokens e renovação automática via heartbeat.',
    url: 'https://github.com/nevvesdev/distributed-lock-manager',
    featured: true,

  },
  {
    id: '20',
    name: 'Realtime Payment',
    lang: 'go',
    tags: ['Go', 'Docker', 'Kafka', 'PostgreSQL', 'Redis'],
    desc: 'Processador de pagamentos em tempo real - estudando sobre GraphQL.',
    url: 'https://github.com/nevvesdev/realtime-payment',
    featured: true,
  }
  // novos projetos acima desta linha
]

export default projects