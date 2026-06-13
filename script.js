(function () {
  var STORAGE_KEY = 'portfolio_projects_v2';
  var OWNER_KEY = 'portfolio_owner';
  var OWNER_PASSPHRASE = 'jvmn';
  var currentFilter = 'all';
  var editingId = null;

  var defaultProjects = [
    { id: '1', name: 'Event-Driven Banking', lang: 'java', tags: ['Java 21', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Docker', 'Microservices'], desc: 'Sistema bancario em microsservicos com transferencias assincronas, idempotencia, retry e arquitetura orientada a eventos.', url: 'https://github.com/joaodddev', featured: true },
    { id: '2', name: 'Notification Worker', lang: 'go', tags: ['Go', 'PostgreSQL', 'Worker Pool', 'Webhooks', 'Docker'], desc: 'Processamento assincrono de notificacoes via webhook com fila persistente, workers concorrentes e graceful shutdown.', url: 'https://github.com/joaodddev', featured: true },
    { id: '3', name: 'Go Auth Gateway', lang: 'go', tags: ['Go', 'Gin', 'JWT', 'Reverse Proxy', 'Docker', 'API Gateway'], desc: 'API Gateway com autenticacao JWT, middleware pipeline e reverse proxy para centralizar autenticacao em microsservicos.', url: 'https://github.com/joaodddev', featured: true },
    { id: '4', name: 'Payment Processor', lang: 'go', tags: ['Go', 'Gin', 'RabbitMQ', 'PostgreSQL', 'Docker', 'Prometheus'], desc: 'Processador de pagamentos com filas, idempotencia, DLQ, retry automatico e observabilidade completa.', url: 'https://github.com/joaodddev', featured: false }
  ];

  var keyBuffer = '';
  var keyTimer = null;

  function isOwner() {
    try { return localStorage.getItem(OWNER_KEY) === '1'; } catch (e) { return false; }
  }

  function setOwner(val) {
    try { localStorage.setItem(OWNER_KEY, val ? '1' : '0'); } catch (e) {}
  }

  function applyOwnerMode() {
    document.body.classList.toggle('owner-mode', isOwner());
  }

  function showToast(msg) {
    var toast = document.getElementById('ownerToast');
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(function () { toast.classList.remove('visible'); }, 2200);
  }

  function loadProjects() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return defaultProjects.slice();
  }

  function saveProjects(projects) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(projects)); } catch (e) {}
  }

  function createCardEl(project) {
    var isGo = project.lang === 'go';
    var isKotlin = project.lang === 'kotlin';
    var tags = project.tags || [];
    var card = document.createElement('div');
    card.className = 'card' + (isGo ? ' card-go' : '') + (isKotlin ? ' card-kotlin' : '') + (project.featured ? ' featured' : '');
    card.dataset.lang = project.lang;
    card.dataset.tags = tags.map(function (t) { return t.toLowerCase(); }).join(',');
    card.dataset.id = project.id;

    var pill = document.createElement('span');
    pill.className = 'card-lang-pill ' + project.lang;
    pill.textContent = project.lang === 'java' ? 'Java' : (project.lang === 'go' ? 'Go' : 'Kotlin');

    var title = document.createElement('p');
    title.className = 'card-title';
    title.textContent = project.name;

    var desc = document.createElement('p');
    desc.className = 'card-desc';
    desc.textContent = project.desc;

    var tagsEl = document.createElement('div');
    tagsEl.className = 'card-tags';
    var visible = tags.slice(0, 4);
    var overflow = tags.length - 4;
    visible.forEach(function (t) {
      var tag = document.createElement('span');
      tag.className = 'card-tag';
      tag.textContent = t;
      tagsEl.appendChild(tag);
    });
    if (overflow > 0) {
      var more = document.createElement('span');
      more.className = 'card-tag';
      more.textContent = '+' + overflow;
      tagsEl.appendChild(more);
    }

    var footer = document.createElement('div');
    footer.className = 'card-footer';

    var link = document.createElement('a');
    link.className = 'card-link';
    link.href = project.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'GitHub →';

    var actions = document.createElement('div');
    actions.className = 'card-actions';

    var editBtn = document.createElement('button');
    editBtn.className = 'card-action-btn';
    editBtn.textContent = 'Editar';
    editBtn.onclick = function (e) {
      e.stopPropagation();
      openDrawer(project.id);
    };

    var delBtn = document.createElement('button');
    delBtn.className = 'card-action-btn delete';
    delBtn.textContent = 'Excluir';
    delBtn.onclick = function (e) {
      e.stopPropagation();
      if (confirm('Remover este projeto?')) {
        var projects = loadProjects().filter(function (p) { return p.id !== project.id; });
        saveProjects(projects);
        renderProjects();
      }
    };

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    footer.appendChild(link);
    footer.appendChild(actions);

    card.appendChild(pill);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(tagsEl);
    card.appendChild(footer);
    return card;
  }

  function renderProjects() {
    var grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    loadProjects().forEach(function (p) { grid.appendChild(createCardEl(p)); });
    applyFilter();
  }

  function applyFilter() {
    document.querySelectorAll('#projectsGrid .card').forEach(function (card) {
      if (currentFilter === 'all') {
        card.style.display = '';
      } else if (currentFilter === 'java' || currentFilter === 'go' || currentFilter === 'kotlin') {
        card.style.display = card.dataset.lang === currentFilter ? '' : 'none';
      } else {
        card.style.display = (card.dataset.tags || '').indexOf(currentFilter) >= 0 ? '' : 'none';
      }
    });
  }

  document.querySelectorAll('.filter-chip').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-chip').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      applyFilter();
    });
  });

  var drawer = document.getElementById('drawer');
  var overlay = document.getElementById('drawerOverlay');
  var newBtn = document.getElementById('newProjectBtn');
  var cancelBtn = document.getElementById('cancelProjectBtn');
  var addBtn = document.getElementById('addProjectBtn');

  function clearForm() {
    document.getElementById('projectName').value = '';
    document.getElementById('projectLang').value = 'java';
    document.getElementById('projectTechs').value = '';
    document.getElementById('projectDesc').value = '';
    document.getElementById('projectUrl').value = '';
  }

  function clearErrors() {
    document.querySelectorAll('.drawer-field').forEach(function (f) { f.classList.remove('error'); });
  }

  function openDrawer(projectId) {
    editingId = projectId || null;
    document.querySelector('.drawer-title').textContent = editingId ? 'Editar projeto' : 'Novo projeto';

    if (editingId) {
      var proj = loadProjects().find(function (p) { return p.id === editingId; });
      if (proj) {
        document.getElementById('projectName').value = proj.name;
        document.getElementById('projectLang').value = proj.lang;
        document.getElementById('projectTechs').value = proj.tags.join(', ');
        document.getElementById('projectDesc').value = proj.desc;
        document.getElementById('projectUrl').value = proj.url;
        addBtn.textContent = 'Salvar alteracoes';
      }
    } else {
      clearForm();
      addBtn.textContent = 'Adicionar card';
    }

    drawer.classList.add('open');
    overlay.classList.add('open');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    editingId = null;
    clearErrors();
  }

  newBtn && newBtn.addEventListener('click', function () { openDrawer(); });
  cancelBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  function validate() {
    var valid = true;
    clearErrors();

    var name = document.getElementById('projectName').value.trim();
    var techs = document.getElementById('projectTechs').value.trim();
    var desc = document.getElementById('projectDesc').value.trim();
    var url = document.getElementById('projectUrl').value.trim();

    if (!name) { document.getElementById('fieldName').classList.add('error'); valid = false; }
    if (!techs) { document.getElementById('fieldTechs').classList.add('error'); valid = false; }
    if (!desc) { document.getElementById('fieldDesc').classList.add('error'); valid = false; }
    if (!url) { document.getElementById('fieldUrl').classList.add('error'); valid = false; }

    return valid;
  }

  addBtn.addEventListener('click', function () {
    if (!validate()) return;

    var projects = loadProjects();
    var tagsArr = document.getElementById('projectTechs').value.trim().split(/[,·]/).map(function (t) { return t.trim(); }).filter(Boolean);
    var lang = document.getElementById('projectLang').value;

    if (editingId) {
      projects = projects.map(function (p) {
        if (p.id === editingId) {
          return {
            id: p.id,
            name: document.getElementById('projectName').value.trim(),
            lang: lang,
            tags: tagsArr,
            desc: document.getElementById('projectDesc').value.trim(),
            url: document.getElementById('projectUrl').value.trim(),
            featured: p.featured || false
          };
        }
        return p;
      });
    } else {
      projects.push({
        id: Date.now().toString(),
        name: document.getElementById('projectName').value.trim(),
        lang: lang,
        tags: tagsArr,
        desc: document.getElementById('projectDesc').value.trim(),
        url: document.getElementById('projectUrl').value.trim(),
        featured: false
      });
    }

    saveProjects(projects);
    renderProjects();
    closeDrawer();
  });

  document.addEventListener('keydown', function (e) {
    if (drawer.classList.contains('open')) {
      if (e.key === 'Escape') closeDrawer();
      return;
    }
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

    keyBuffer += e.key.toLowerCase();
    clearTimeout(keyTimer);
    keyTimer = setTimeout(function () { keyBuffer = ''; }, 2000);

    if (keyBuffer === OWNER_PASSPHRASE) {
      keyBuffer = '';
      var newState = !isOwner();
      setOwner(newState);
      applyOwnerMode();
      showToast(newState ? 'Modo editor ativado' : 'Modo editor desativado');
    }
  });

  applyOwnerMode();
  renderProjects();
})();