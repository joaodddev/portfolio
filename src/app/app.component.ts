import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Lang = 'java' | 'go' | 'kotlin';

interface Project {
  id: string;
  name: string;
  lang: Lang;
  tags: string[];
  desc: string;
  url: string;
  featured: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <section class="hero">
        <h1 class="hero-name fade-in" style="animation-delay: 0ms">João Victor Macedo Neves</h1>
        <p class="hero-status fade-in" style="animation-delay: 100ms">
          Backend Developer · <span class="lang-java">Java</span> & Spring Boot · <span class="lang-go">Golang</span>
        </p>

        <div class="hero-links fade-in" style="animation-delay: 200ms">
          <a href="https://github.com/joaodddev" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/joao-victor-macedo-neves/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/nevves.dev/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.youtube.com/@joaoccode" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </section>

      <div class="divider fade-in" style="animation-delay: 300ms"></div>

      <section class="projects-section">
        <div class="projects-header">
          <span class="section-label fade-in" style="animation-delay: 400ms">Projetos</span>
          <button class="new-project-btn fade-in owner-only" style="animation-delay: 400ms" (click)="openDrawer()">
            + Novo projeto
          </button>
        </div>

        <div class="filters fade-in" style="animation-delay: 450ms">
          <button class="filter-chip" [class.active]="currentFilter === 'all'" (click)="setFilter('all')">Todos</button>
          <button class="filter-chip" [class.active]="currentFilter === 'java'" (click)="setFilter('java')">Java</button>
          <button class="filter-chip" [class.active]="currentFilter === 'go'" (click)="setFilter('go')">Go</button>
          <button class="filter-chip" [class.active]="currentFilter === 'spring'" (click)="setFilter('spring')">Spring</button>
          <button class="filter-chip" [class.active]="currentFilter === 'kafka'" (click)="setFilter('kafka')">Kafka</button>
          <button class="filter-chip" [class.active]="currentFilter === 'docker'" (click)="setFilter('docker')">Docker</button>
        </div>

        <div class="projects-grid fade-in" style="animation-delay: 500ms">
          <div
            class="card"
            *ngFor="let project of filteredProjects()"
            [class.card-go]="project.lang === 'go'"
            [class.featured]="project.featured"
          >
            <span class="card-lang-pill" [ngClass]="project.lang">
              {{ project.lang === 'java' ? 'Java' : 'Go' }}
            </span>

            <p class="card-title">{{ project.name }}</p>
            <p class="card-desc">{{ project.desc }}</p>

            <div class="card-tags">
              <span class="card-tag" *ngFor="let tag of visibleTags(project)">{{ tag }}</span>
              <span class="card-tag overflow-tag" *ngIf="overflowCount(project) > 0">+{{ overflowCount(project) }}</span>
            </div>

            <div class="card-footer">
              <a class="card-link" [href]="project.url" target="_blank" rel="noopener noreferrer">GitHub →</a>

              <div class="card-actions" *ngIf="isOwner">
                <button class="card-action-btn" (click)="openDrawer(project.id)">Editar</button>
                <button class="card-action-btn delete" (click)="deleteProject(project.id)">Excluir</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer fade-in" style="animation-delay: 600ms">
        João Victor &copy; 2025
      </footer>
    </div>

    <div class="owner-toast" [class.visible]="toastVisible">{{ toastMessage }}</div>

    <div class="drawer-overlay" [class.open]="drawerOpen" (click)="closeDrawer()"></div>

    <div class="drawer" [class.open]="drawerOpen">
      <p class="drawer-title">{{ editingId ? 'Editar projeto' : 'Novo projeto' }}</p>

      <div class="drawer-field" [class.error]="errors.name">
        <label for="projectName">Nome do projeto</label>
        <input type="text" id="projectName" [(ngModel)]="form.name" placeholder="ex: api-gateway" />
        <span class="error-msg">Informe o nome do projeto</span>
      </div>

      <div class="drawer-field">
        <label for="projectLang">Linguagem principal</label>
        <select id="projectLang" [(ngModel)]="form.lang">
          <option value="java">Java</option>
          <option value="go">Go</option>
        </select>
      </div>

      <div class="drawer-field" [class.error]="errors.techs">
        <label for="projectTechs">Tecnologias usadas</label>
        <input type="text" id="projectTechs" [(ngModel)]="form.techs" placeholder="ex: Spring Boot · Kafka · PostgreSQL" />
        <span class="error-msg">Informe as tecnologias</span>
      </div>

      <div class="drawer-field" [class.error]="errors.desc">
        <label for="projectDesc">Descricao curta</label>
        <textarea id="projectDesc" [(ngModel)]="form.desc" maxlength="120" placeholder="Breve descricao do projeto..."></textarea>
        <span class="error-msg">Informe a descricao</span>
      </div>

      <div class="drawer-field" [class.error]="errors.url">
        <label for="projectUrl">Link do repositorio</label>
        <input type="url" id="projectUrl" [(ngModel)]="form.url" placeholder="https://github.com/..." />
        <span class="error-msg">Informe um link valido</span>
      </div>

      <div class="drawer-actions">
        <button class="btn-primary" (click)="saveProject()">{{ editingId ? 'Salvar alteracoes' : 'Adicionar card' }}</button>
        <button class="btn-ghost" (click)="closeDrawer()">Cancelar</button>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  storageKey = 'portfolio_projects_v2';
  ownerKey = 'portfolio_owner';
  ownerPassphrase = 'jvmn';

  currentFilter = 'all';
  editingId: string | null = null;
  drawerOpen = false;
  isOwner = false;
  toastVisible = false;
  toastMessage = '';

  keyBuffer = '';
  keyTimer: any = null;

  form = {
    name: '',
    lang: 'java' as Lang,
    techs: '',
    desc: '',
    url: ''
  };

  errors = {
    name: false,
    techs: false,
    desc: false,
    url: false
  };

  defaultProjects: Project[] = [
    {
      id: '1',
      name: 'Event-Driven Banking',
      lang: 'java',
      tags: ['Java 21', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Docker', 'Microservices'],
      desc: 'Sistema bancario em microsservicos com transferencias assincronas, idempotencia, retry e arquitetura orientada a eventos.',
      url: 'https://github.com/joaodddev',
      featured: true
    },
    {
      id: '2',
      name: 'Notification Worker',
      lang: 'go',
      tags: ['Go', 'PostgreSQL', 'Worker Pool', 'Webhooks', 'Docker'],
      desc: 'Processamento assincrono de notificacoes via webhook com fila persistente, workers concorrentes e graceful shutdown.',
      url: 'https://github.com/joaodddev',
      featured: true
    },
    {
      id: '3',
      name: 'Go Auth Gateway',
      lang: 'go',
      tags: ['Go', 'Gin', 'JWT', 'Reverse Proxy', 'Docker', 'API Gateway'],
      desc: 'API Gateway com autenticacao JWT, middleware pipeline e reverse proxy para centralizar autenticacao em microsservicos.',
      url: 'https://github.com/joaodddev',
      featured: true
    },
    {
      id: '4',
      name: 'Payment Processor',
      lang: 'go',
      tags: ['Go', 'Gin', 'RabbitMQ', 'PostgreSQL', 'Docker', 'Prometheus'],
      desc: 'Processador de pagamentos com filas, idempotencia, DLQ, retry automatico e observabilidade completa.',
      url: 'https://github.com/joaodddev',
      featured: false
    }
  ];

  projects: Project[] = [];

  constructor() {
    this.isOwner = this.readOwner();
    this.projects = this.loadProjects();
    document.body.classList.toggle('owner-mode', this.isOwner);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.drawerOpen) {
      if (event.key === 'Escape') this.closeDrawer();
      return;
    }

    const target = event.target as HTMLElement;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName)) return;

    this.keyBuffer += event.key.toLowerCase();
    clearTimeout(this.keyTimer);
    this.keyTimer = setTimeout(() => (this.keyBuffer = ''), 2000);

    if (this.keyBuffer === this.ownerPassphrase) {
      this.keyBuffer = '';
      this.isOwner = !this.isOwner;
      this.saveOwner(this.isOwner);
      document.body.classList.toggle('owner-mode', this.isOwner);
      this.showToast(this.isOwner ? 'Modo editor ativado' : 'Modo editor desativado');
    }
  }

  loadProjects(): Project[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) return JSON.parse(data);
    } catch {}
    return [...this.defaultProjects];
  }

  saveProjects(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
    } catch {}
  }

  readOwner(): boolean {
    try {
      return localStorage.getItem(this.ownerKey) === '1';
    } catch {
      return false;
    }
  }

  saveOwner(val: boolean): void {
    try {
      localStorage.setItem(this.ownerKey, val ? '1' : '0');
    } catch {}
  }

  showToast(msg: string): void {
    this.toastMessage = msg;
    this.toastVisible = true;
    setTimeout(() => (this.toastVisible = false), 2200);
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
  }

  filteredProjects(): Project[] {
    if (this.currentFilter === 'all') return this.projects;
    if (this.currentFilter === 'java' || this.currentFilter === 'go') {
      return this.projects.filter(p => p.lang === this.currentFilter);
    }
    return this.projects.filter(p => p.tags.some(tag => tag.toLowerCase().includes(this.currentFilter)));
  }

  visibleTags(project: Project): string[] {
    return project.tags.slice(0, 4);
  }

  overflowCount(project: Project): number {
    return Math.max(project.tags.length - 4, 0);
  }

  openDrawer(projectId?: string): void {
    this.editingId = projectId || null;
    if (this.editingId) {
      const proj = this.projects.find(p => p.id === this.editingId);
      if (proj) {
        this.form = {
          name: proj.name,
          lang: proj.lang,
          techs: proj.tags.join(', '),
          desc: proj.desc,
          url: proj.url
        };
      }
    } else {
      this.clearForm();
    }
    this.drawerOpen = true;
  }

  closeDrawer(): void {
    this.drawerOpen = false;
    this.editingId = null;
    this.clearErrors();
  }

  clearForm(): void {
    this.form = { name: '', lang: 'java', techs: '', desc: '', url: '' };
  }

  clearErrors(): void {
    this.errors = { name: false, techs: false, desc: false, url: false };
  }

  validate(): boolean {
    this.clearErrors();
    let valid = true;
    if (!this.form.name.trim()) { this.errors.name = true; valid = false; }
    if (!this.form.techs.trim()) { this.errors.techs = true; valid = false; }
    if (!this.form.desc.trim()) { this.errors.desc = true; valid = false; }
    if (!this.form.url.trim()) { this.errors.url = true; valid = false; }
    return valid;
  }

  saveProject(): void {
    if (!this.validate()) return;

    const tagsArr = this.form.techs.split(/[,·]/).map(t => t.trim()).filter(Boolean);

    if (this.editingId) {
      this.projects = this.projects.map(p =>
        p.id === this.editingId
          ? {
              id: p.id,
              name: this.form.name.trim(),
              lang: this.form.lang,
              tags: tagsArr,
              desc: this.form.desc.trim(),
              url: this.form.url.trim(),
              featured: p.featured
            }
          : p
      );
    } else {
      this.projects.push({
        id: Date.now().toString(),
        name: this.form.name.trim(),
        lang: this.form.lang,
        tags: tagsArr,
        desc: this.form.desc.trim(),
        url: this.form.url.trim(),
        featured: false
      });
    }

    this.saveProjects();
    this.closeDrawer();
  }

  deleteProject(id: string): void {
    if (confirm('Remover este projeto?')) {
      this.projects = this.projects.filter(p => p.id !== id);
      this.saveProjects();
    }
  }
}