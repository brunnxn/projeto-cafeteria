document.addEventListener('DOMContentLoaded', () => {
  // DADOS DO CARDÁPIO E GATOS
  let menuData = {};
  let gatosData = [];

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

      renderMenuItems('cafes');
      renderGatos();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  carregarDados();


  // ELEMENTOS DOM
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.tab-section');
  const menuItemList = document.getElementById('menuItemList');
  const subtabButtons = document.querySelectorAll('.subtab-btn');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  const btnVerCardapioHero = document.getElementById('btnVerCardapioHero');
  const btnConhecaGatosHero = document.getElementById('btnConhecaGatosHero');
  const btnAdoteHeader = document.getElementById('btnAdoteHeader');
  const btnVoltarInicio = document.getElementById('btnVoltarInicio');
  const brandLogo = document.getElementById('brandLogo');

  const placeholderTitle = document.getElementById('placeholderTitle');
  const placeholderText = document.getElementById('placeholderText');

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

  // NAVEGAÇÃO ENTRE GUIAS
  const sectionTitles = {
    'sobre-contato': 'Sobre & Contato',
    gatos: 'Gatos para Adoção'
  };

  const sectionDescriptions = {
    'sobre-contato': 'Conheça a história do nosso café, nossa missão com os animais e entre em contato conosco para agendar visitas ou tirar dúvidas!',
    gatos: 'Em breve você poderá ver a galeria completa com fotos, nomes, idades e personalidades dos gatinhos resgatados!'
  };

  function switchTab(tabId) {
    navLinks.forEach(link => {
      if (link.getAttribute('data-tab') === tabId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    navMenu.classList.remove('active');
    hamburgerBtn.classList.remove('open');

    sections.forEach(section => section.classList.remove('active'));

    if (tabId === 'inicio') {
      document.getElementById('sec-inicio').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'cardapio') {
      document.getElementById('sec-cardapio').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'gatos') {
      document.getElementById('sec-gatos').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'sobre-contato') {
      document.getElementById('sec-sobre').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const secPlaceholder = document.getElementById('sec-placeholder');
      placeholderTitle.textContent = sectionTitles[tabId] || 'Sessão em Construção';
      placeholderText.textContent = sectionDescriptions[tabId] || 'Esta funcionalidade estará disponível muito em breve!';
      secPlaceholder.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  brandLogo.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('inicio');
  });

  if (btnVerCardapioHero) {
    btnVerCardapioHero.addEventListener('click', () => {
      switchTab('cardapio');
    });
  }

  if (btnConhecaGatosHero) {
    btnConhecaGatosHero.addEventListener('click', () => {
      switchTab('gatos');
    });
  }

  if (btnAdoteHeader) {
    btnAdoteHeader.addEventListener('click', () => {
      switchTab('gatos');
    });
  }

  if (btnVoltarInicio) {
    btnVoltarInicio.addEventListener('click', () => {
      switchTab('inicio');
    });
  }

  // RENDERIZAÇÃO E ALTERNÂNCIA DE SUB-ABAS DO CARDÁPIO
  function renderMenuItems(category) {
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

  subtabButtons.forEach(button => {
    button.addEventListener('click', () => {
      subtabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');
      renderMenuItems(category);
    });
  });

  // MENU HAMBÚRGUER (MOBILE)
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    navMenu.classList.toggle('active');
  });

  let filtroAtivo = 'todos';
  let termoBusca = '';

  function renderGatos() {
    gatosGrid.innerHTML = '';

    const gatosFiltrados = gatosData.filter(gato => {
      const temPersonalidade = filtroAtivo === 'todos' || gato.tags.includes(filtroAtivo);
      const temNome = gato.nome.toLowerCase().includes(termoBusca.toLowerCase());
      return temPersonalidade && temNome;
    });

    if (gatosFiltrados.length === 0) {
      gatosSemResultado.style.display = 'block';
    } else {
      gatosSemResultado.style.display = 'none';
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

  filtroButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filtroButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filtroAtivo = btn.getAttribute('data-filtro');
      renderGatos();
    });
  });

  function abrirModal(nomeGato, iconeGato) {
    modalGatoNome.textContent = nomeGato;
    modalGatoFoto.innerHTML = `<img src="${iconeGato}" alt="${nomeGato}" />`;

    formAdocao.style.display = 'flex';
    modalSucesso.style.display = 'none';

    formAdocao.reset();

    modalAdocao.classList.add('aberto');
    document.body.style.overflow = 'hidden'; 
  }

  function fecharModal() {
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

  const inputTelefone = document.getElementById('inputTelefone');

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

  if (btnFecharSucesso) {
    btnFecharSucesso.addEventListener('click', fecharModal);
  }

  if (formAdocao) {
    formAdocao.addEventListener('submit', (e) => {
      e.preventDefault(); 

      const nome = document.getElementById('inputNome').value.trim();
      const email = document.getElementById('inputEmail').value.trim();
      const telefone = document.getElementById('inputTelefone').value.trim();
      const cidade = document.getElementById('inputCidade').value.trim();
      const moradia = document.getElementById('selectMoradia').value;
      const experiencia = document.getElementById('selectExperiencia').value;

      if (!nome || !email || !telefone || !cidade || !moradia || !experiencia) {
        alert('Preencha todos os campos obrigatórios!');
        return;
      }

      const digitosTelefone = telefone.replace(/\D/g, '');
      if (digitosTelefone.length < 10) {
        alert('Por favor, digite um número de telefone/WhatsApp válido com DDD (mínimo 10 dígitos).');
        return;
      }

      const nomeDoGato = modalGatoNome.textContent;

      sucessoTexto.textContent = `Obrigada, ${nome}! Seu interesse em adotar o(a) ${nomeDoGato} foi registrado com sucesso.`;

      formAdocao.style.display = 'none';
      modalSucesso.style.display = 'flex';
    });
  }

});
