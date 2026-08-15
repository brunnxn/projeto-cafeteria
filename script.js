document.addEventListener('DOMContentLoaded', () => {
  // DADOS DO CARDÁPIO E GATOS
  let menuData = {};
  let gatosData = [];

  // ELEMENTOS DOM
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  const menuItemList = document.getElementById('menuItemList');
  const subtabButtons = document.querySelectorAll('.subtab-btn');

  const gatosGrid = document.getElementById('gatosGrid');
  const gatoBusca = document.getElementById('gatoBusca');
  const filtroButtons = document.querySelectorAll('.filtro-btn');
  const gatosSemResultado = document.getElementById('gatosSemResultado');

  const modalAdocao = document.getElementById('modalAdocao');
  const btnFecharModal = document.getElementById('btnFecharModal');
  const modalGatoNome = document.getElementById('modalGatoNome');
  const modalGatoFoto = document.getElementById('modalGatoFoto');
  const formAdocao = document.getElementById('formAdocao');
  const modalSucesso = document.getElementById('modalSucesso');
  const sucessoTexto = document.getElementById('sucessoTexto');
  const btnFecharSucesso = document.getElementById('btnFecharSucesso');
  const inputTelefone = document.getElementById('inputTelefone');

  // MENU HAMBÚRGUER (MOBILE)
  const navOverlay = document.getElementById('navOverlay');

  function fecharMenuMobile() {
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    if (navMenu) {
      navMenu.classList.remove('active');
    }
    if (navOverlay) {
      navOverlay.classList.remove('active');
    }
  }

  function abrirMenuMobile() {
    if (hamburgerBtn) {
      hamburgerBtn.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    if (navMenu) {
      navMenu.classList.add('active');
    }
    if (navOverlay) {
      navOverlay.classList.add('active');
    }
  }

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const estaAberto = hamburgerBtn.classList.contains('open');
      if (estaAberto) {
        fecharMenuMobile();
      } else {
        abrirMenuMobile();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', fecharMenuMobile);
  }

  const navLinks = document.querySelectorAll('.nav-link, .btn-mobile-nav');
  navLinks.forEach(link => {
    link.addEventListener('click', fecharMenuMobile);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      fecharMenuMobile();
    }
  });

  // CARREGAMENTO ASSÍNCRONO DE DADOS
  async function carregarDados() {
    try {
      const [menuRes, gatosRes] = await Promise.all([
        fetch('./data/menu.json'),
        fetch('./data/gatos.json')
      ]);

      if (!menuRes.ok || !gatosRes.ok) {
        throw new Error('Falha ao carregar os dados JSON.');
      }

      menuData = await menuRes.json();
      gatosData = await gatosRes.json();

      if (menuItemList) {
        renderMenuItems('cafes');
      }

      if (gatosGrid) {
        renderGatos();
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  carregarDados();

  // RENDERIZAÇÃO E ALTERNÂNCIA DE SUB-ABAS DO CARDÁPIO
  function renderMenuItems(category) {
    if (!menuItemList) return;

    const items = menuData[category] || [];
    menuItemList.innerHTML = '';

    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'menu-item-row';

      const badgeHTML = item.badge
        ? `<span class="badge-mais-pedido">${item.badge}</span>`
        : '';

      li.innerHTML = `
        <div class="item-left-group">
          <div class="item-icon-circle">${item.icon}</div>
          <div class="item-details">
            <div class="item-header">
              <span class="item-name">${item.name}</span>
              ${badgeHTML}
            </div>
            <span class="item-desc">${item.description}</span>
          </div>
        </div>
        <div class="item-price">${item.price}</div>
      `;

      menuItemList.appendChild(li);
    });
  }

  if (subtabButtons.length > 0) {
    subtabButtons.forEach(button => {
      button.addEventListener('click', () => {
        subtabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');
        renderMenuItems(category);
      });
    });
  }

  // RENDERIZAÇÃO E FILTRAGEM DE GATOS PARA ADOÇÃO
  let filtroAtivo = 'todos';
  let termoBusca = '';

  function renderGatos() {
    if (!gatosGrid) return;

    gatosGrid.innerHTML = '';

    const gatosFiltrados = gatosData.filter(gato => {
      const temPersonalidade = filtroAtivo === 'todos' || gato.tags.includes(filtroAtivo);
      const temNome = gato.nome.toLowerCase().includes(termoBusca.toLowerCase());
      return temPersonalidade && temNome;
    });

    if (gatosSemResultado) {
      gatosSemResultado.style.display = gatosFiltrados.length === 0 ? 'block' : 'none';
    }

    gatosFiltrados.forEach(gato => {
      const card = document.createElement('div');
      card.className = 'gato-card';

      const tagsHTML = gato.tags.map(tag => `<span class="gato-tag">${tag}</span>`).join('');

      card.innerHTML = `
        <div class="gato-foto-area">
          <img src="${gato.icone}" alt="${gato.nome}" class="gato-foto">
          <span class="gato-status-badge">Disponível</span>
        </div>
        <div class="gato-card-body">
          <p class="gato-nome">${gato.nome}</p>
          <p class="gato-idade"><i class="fa-solid fa-calendar-days"></i> ${gato.idade}</p>
          <div class="gato-tags">${tagsHTML}</div>
          <p class="gato-descricao-card">${gato.descricao}</p>
          <button class="btn btn-pink-solid gato-btn-adotar" data-nome="${gato.nome}" data-icone="${gato.icone}">
            <i class="fa-solid fa-paw"></i> Quero Adotar
          </button>
        </div>
      `;

      gatosGrid.appendChild(card);
    });

    const botoesAdotar = gatosGrid.querySelectorAll('.gato-btn-adotar');
    botoesAdotar.forEach(btn => {
      btn.addEventListener('click', () => {
        const nomeGato = btn.getAttribute('data-nome');
        const iconeGato = btn.getAttribute('data-icone');
        abrirModal(nomeGato, iconeGato);
      });
    });
  }

  if (gatoBusca) {
    gatoBusca.addEventListener('input', () => {
      termoBusca = gatoBusca.value;
      renderGatos();
    });
  }

  if (filtroButtons.length > 0) {
    filtroButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filtroButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filtroAtivo = btn.getAttribute('data-filtro');
        renderGatos();
      });
    });
  }

  // MODAL DE ADOÇÃO
  function abrirModal(nomeGato, iconeGato) {
    if (!modalAdocao) return;

    if (modalGatoNome) modalGatoNome.textContent = nomeGato;
    if (modalGatoFoto) modalGatoFoto.innerHTML = `<img src="${iconeGato}" alt="${nomeGato}" />`;

    if (formAdocao) {
      formAdocao.style.display = 'flex';
      formAdocao.reset();
    }

    if (modalSucesso) {
      modalSucesso.style.display = 'none';
    }

    modalAdocao.classList.add('aberto');
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    if (!modalAdocao) return;
    modalAdocao.classList.remove('aberto');
    document.body.style.overflow = '';
  }

  if (btnFecharModal) {
    btnFecharModal.addEventListener('click', fecharModal);
  }

  if (modalAdocao) {
    modalAdocao.addEventListener('click', (e) => {
      if (e.target === modalAdocao) {
        fecharModal();
      }
    });
  }

  if (btnFecharSucesso) {
    btnFecharSucesso.addEventListener('click', fecharModal);
  }

  // MÁSCARA E RESTRIÇÃO DE TELEFONE
  if (inputTelefone) {
    inputTelefone.addEventListener('input', (e) => {
      let digits = e.target.value.replace(/\D/g, '');
      if (digits.length > 11) {
        digits = digits.slice(0, 11);
      }

      if (digits.length === 0) {
        e.target.value = '';
      } else if (digits.length <= 2) {
        e.target.value = `(${digits}`;
      } else if (digits.length <= 6) {
        e.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      } else if (digits.length <= 10) {
        e.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else {
        e.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      }
    });
  }

  // SUBMISSÃO DO FORMULÁRIO DE ADOÇÃO
  if (formAdocao) {
    formAdocao.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('inputNome')?.value.trim() || '';
      const email = document.getElementById('inputEmail')?.value.trim() || '';
      const telefone = document.getElementById('inputTelefone')?.value.trim() || '';
      const cidade = document.getElementById('inputCidade')?.value.trim() || '';
      const moradia = document.getElementById('selectMoradia')?.value || '';
      const experiencia = document.getElementById('selectExperiencia')?.value || '';

      if (!nome || !email || !telefone || !cidade || !moradia || !experiencia) {
        alert('Preencha todos os campos obrigatórios!');
        return;
      }

      const digitosTelefone = telefone.replace(/\D/g, '');
      if (digitosTelefone.length < 10) {
        alert('Por favor, digite um número de telefone/WhatsApp válido com DDD (mínimo 10 dígitos).');
        return;
      }

      const nomeDoGato = modalGatoNome ? modalGatoNome.textContent : 'gatinho';

      if (sucessoTexto) {
        sucessoTexto.textContent = `Obrigada, ${nome}! Seu interesse em adotar o(a) ${nomeDoGato} foi registrado com sucesso.`;
      }

      formAdocao.style.display = 'none';
      if (modalSucesso) {
        modalSucesso.style.display = 'flex';
      }
    });
  }
});
