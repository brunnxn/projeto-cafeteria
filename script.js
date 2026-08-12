document.addEventListener('DOMContentLoaded', () => {
  // 1. DADOS DO CARDÁPIO (MENU DATA)
  const menuData = {
    cafes: [
      {
        name: 'Espresso Neko',
        description: 'Espresso encorpado e aromático.',
        price: 'R$ 8,50',
        badge: null,
        icon: '☕'
      },
      {
        name: 'Latte Neko',
        description: 'Leite vaporizado com espresso e arte de patinha.',
        price: 'R$ 14,90',
        badge: 'Mais Pedido',
        icon: '🥛'
      },
      {
        name: 'Cappuccino Sakura',
        description: 'Cappuccino com toque de flor de cerejeira.',
        price: 'R$ 15,90',
        badge: null,
        icon: '🌸'
      },
      {
        name: 'Mocha Matcha',
        description: 'Chocolate branco, matcha e espresso.',
        price: 'R$ 16,90',
        badge: null,
        icon: '🍵'
      },
      {
        name: 'Cold Brew Yuzu',
        description: 'Café gelado com toque cítrico de yuzu.',
        price: 'R$ 14,50',
        badge: null,
        icon: '🧊'
      }
    ],
    bebidas: [
      {
        name: 'Chá Verde Sencha',
        description: 'Chá verde tradicional japonês refrescante.',
        price: 'R$ 9,90',
        badge: null,
        icon: '🍵'
      },
      {
        name: 'Pink Lemonade Sakura',
        description: 'Limonada artesanal com xarope de flor de cerejeira.',
        price: 'R$ 12,90',
        badge: 'Mais Pedido',
        icon: '🌸'
      },
      {
        name: 'Soda Italiana Maçã Verde',
        description: 'Xarope de maçã verde, água com gás e gelo.',
        price: 'R$ 11,50',
        badge: null,
        icon: '🍏'
      },
      {
        name: 'Chocolate Quente Cremoso',
        description: 'Chocolate nobre derretido com chantilly.',
        price: 'R$ 13,90',
        badge: null,
        icon: '🍫'
      }
    ],
    doces: [
      {
        name: 'Mochi de Morango',
        description: 'Bolinho de arroz tradicional recheado com morango e anko.',
        price: 'R$ 10,00',
        badge: 'Mais Pedido',
        icon: '🍓'
      },
      {
        name: 'Cheesecake Sakura',
        description: 'Cheesecake leve com geleia artesanal de cereja.',
        price: 'R$ 16,50',
        badge: null,
        icon: '🍰'
      },
      {
        name: 'Taiyaki de Chocolate',
        description: 'Wafer em formato de peixe recheado com chocolate quente.',
        price: 'R$ 12,00',
        badge: null,
        icon: '🐟'
      },
      {
        name: 'Cookie Patinha de Gato',
        description: 'Cookie crocante por fora e macio com gotas de chocolate.',
        price: 'R$ 7,50',
        badge: null,
        icon: '🐾'
      }
    ],
    salgados: [
      {
        name: 'Croissant de Queijo e Presunto',
        description: 'Croissant folhado francês assado na hora.',
        price: 'R$ 13,50',
        badge: 'Mais Pedido',
        icon: '🥐'
      },
      {
        name: 'Quiche de Alho-Poró',
        description: 'Quiche individual com massa amanteigada.',
        price: 'R$ 14,00',
        badge: null,
        icon: '🥧'
      },
      {
        name: 'Pão de Queijo Especial',
        description: 'Pão de queijo quentinho com queijo da canastra.',
        price: 'R$ 6,00',
        badge: null,
        icon: '🧀'
      },
      {
        name: 'Sanduíche Natural Avocado & Ovo',
        description: 'Pão artesanal, pasta de avocado, ovo poché e brotos.',
        price: 'R$ 18,90',
        badge: null,
        icon: '🥪'
      }
    ],
    combos: [
      {
        name: 'Combo Neko Simples',
        description: '1 Espresso Neko + 1 Cookie Patinha de Gato.',
        price: 'R$ 14,50',
        badge: null,
        icon: '☕'
      },
      {
        name: 'Combo Tarde no Café',
        description: '1 Latte Neko + 1 Mochi de Morango.',
        price: 'R$ 22,90',
        badge: 'Mais Pedido',
        icon: '🐾'
      },
      {
        name: 'Combo Brunch Completo',
        description: '1 Cappuccino Sakura + 1 Croissant + 1 Cheesecake.',
        price: 'R$ 41,00',
        badge: null,
        icon: '✨'
      }
    ]
  };

  const gatosData = [
    {
      nome: 'Zilu',
      idade: '10 anos',
      icone: './assets/img/zilu.jpeg',
      tags: ['Brincalhão', 'Carinhoso', 'Sociável'],
      descricao: 'Zilu é uma gatinha preto com branco cheia de energia! Adora brincar com bolinhas e fica feliz quando tem companhia por perto.'
    },
    {
      nome: 'Malu',
      idade: '4 anos',
      icone: './assets/img/malu.jpeg',
      tags: ['Calmo', 'Carinhoso', 'Independente'],
      descricao: 'Malu é uma gatinha rajada e delicada. Ela gosta de lugares tranquilos, de cochilar no sol e de receber carinho com calma.'
    },
    {
      nome: 'Lilo',
      idade: '6 meses',
      icone: './assets/img/lilo.jpeg',
      tags: ['Brincalhão', 'Curioso', 'Sociável'],
      descricao: 'Lilo é a mais novo do grupo e tem curiosidade por tudo! Bota o nariz em tudo e faz amizade com qualquer um rapidinho.'
    },
    {
      nome: 'Pérola',
      idade: '1 anos',
      icone: './assets/img/perola.jpeg',
      tags: ['Independente', 'Calmo', 'Curioso'],
      descricao: 'Pérola é uma gatinha preta com olhos dourados, muito observadora. Prefere seu espaço, mas quando escolhe um dono, é para sempre.'
    },
    {
      nome: 'Tito',
      idade: '5 anos',
      icone: './assets/img/tito.jpeg',
      tags: ['Carinhoso', 'Calmo', 'Sociável'],
      descricao: 'Tito é a mais experiente da turma. Ama ficar no colo, ronronar baixinho e é ótima companhia para quem vive sozinho.'
    },
    {
      nome: 'Leon',
      idade: '2 anos',
      icone: './assets/img/leon.jpeg',
      tags: ['Brincalhão', 'Curioso', 'Independente'],
      descricao: 'Leon é uma gata tricolor muito esperta. Gosta de escalar prateleiras, explorar cantinhos e inventar moda pela casa toda.'
    },
    {
      nome: 'Lilica',
      idade: '3 anos',
      icone: './assets/img/lilica.jpeg',
      tags: ['Carinhoso', 'Sociável', 'Brincalhão'],
      descricao: 'Lilica é uma gatinha que ama companhia. Se relaciona bem com crianças e outros animais, ideal para famílias.'
    },
    {
      nome: 'Olaf',
      idade: '4 anos',
      icone: './assets/img/olaf.jpeg',
      tags: ['Curioso', 'Brincalhão', 'Sociável'],
      descricao: 'Olaf é fofo e está aprendendo tudo! Super ativo, afetivo e pronto para crescer com uma família cheia de amor.'
    }
  ];

  // 2. ELEMENTOS DOM
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.tab-section');
  const menuItemList = document.getElementById('menuItemList');
  const subtabButtons = document.querySelectorAll('.subtab-btn');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  // Botões de Ação
  const btnVerCardapioHero = document.getElementById('btnVerCardapioHero');
  const btnConhecaGatosHero = document.getElementById('btnConhecaGatosHero');
  const btnAdoteHeader = document.getElementById('btnAdoteHeader');
  const btnVoltarInicio = document.getElementById('btnVoltarInicio');
  const brandLogo = document.getElementById('brandLogo');

  // Placeholders
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

  // 3. TOAST NOTIFICATION UTILITY
  let toastTimeout;
  function showToast(message) {
    clearTimeout(toastTimeout);
    toastMessage.textContent = message;
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 4. SPA NAVEGAÇÃO ENTRE GUIAS PRINCIPAIS
  const sectionTitles = {
    'sobre-contato': 'Sobre & Contato',
    gatos: 'Gatos para Adoção'
  };

  const sectionDescriptions = {
    'sobre-contato': 'Conheça a história do nosso café, nossa missão com os animais e entre em contato conosco para agendar visitas ou tirar dúvidas!',
    gatos: 'Em breve você poderá ver a galeria completa com fotos, nomes, idades e personalidades dos gatinhos resgatados!'
  };

  function switchTab(tabId) {
    // 1. Atualizar links da barra de navegação (cor e sublinhado)
    navLinks.forEach(link => {
      if (link.getAttribute('data-tab') === tabId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 2. Fechar menu hambúrguer mobile se estiver aberto
    navMenu.classList.remove('active');
    hamburgerBtn.classList.remove('open');

    // 3. Esconder todas as seções
    sections.forEach(section => section.classList.remove('active'));

    // 4. Mostrar a seção correspondente
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

  // Event Listeners nos links da nav
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Logo link direciona para o Início
  brandLogo.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('inicio');
  });

  // Botão "Ver Cardápio" no Hero
  if (btnVerCardapioHero) {
    btnVerCardapioHero.addEventListener('click', () => {
      switchTab('cardapio');
    });
  }

  // Botões não-funcionais que mostram feedback por toast ou placeholder
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

  // 5. RENDERIZAÇÃO E ALTERNÂNCIA DE SUB-ABAS DO CARDÁPIO
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

  // Event Listeners das Sub-abas do Cardápio
  subtabButtons.forEach(button => {
    button.addEventListener('click', () => {
      subtabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');
      renderMenuItems(category);
    });
  });

  // Renderizar categoria inicial ("cafes")
  renderMenuItems('cafes');

  // 6. MENU HAMBÚRGUER (MOBILE)
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
          <p class="gato-idade">📅 ${gato.idade}</p>
          <div class="gato-tags">${tagsHTML}</div>
          <p class="gato-descricao-card">${gato.descricao}</p>
          <button class="btn btn-pink-solid gato-btn-adotar" data-nome="${gato.nome}" data-icone="${gato.icone}">
            🐾 Quero Adotar
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

  renderGatos();

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
        showToast('âš ï¸ Preencha todos os campos obrigatÃ³rios!');
        return;
      }

      const nomeDoGato = modalGatoNome.textContent;

      sucessoTexto.textContent = `Obrigada, ${nome}! Seu interesse em adotar o(a) ${nomeDoGato} foi registrado com sucesso.`;

      formAdocao.style.display = 'none';
      modalSucesso.style.display = 'flex';
    });
  }

});
