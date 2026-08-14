// ---------- Splash / animação de abertura ----------
(function () {
    const splash = document.getElementById('splash');
    if (!splash) return;
    const MIN_TIME = 1100; // duração mínima em ms para a animação ser percebida
    const start = Date.now();

    function hideSplash() {
        const elapsed = Date.now() - start;
        const wait = Math.max(MIN_TIME - elapsed, 0);
        setTimeout(() => {
            splash.classList.add('splash-hide');
            document.body.classList.remove('no-scroll');
            setTimeout(() => splash.remove(), 700);
        }, wait);
    }

    document.body.classList.add('no-scroll');
    if (document.readyState === 'complete') {
        hideSplash();
    } else {
        window.addEventListener('load', hideSplash);
        // salvaguarda: nunca prender o usuário na tela de abertura
        setTimeout(hideSplash, 4000);
    }
})();

// ---------- Vídeo-tutoriais ----------
// Cole o link do YouTube de cada assunto no campo "url" abaixo.
// Aceita links do tipo https://www.youtube.com/watch?v=ID, https://youtu.be/ID
// ou o link de "compartilhar". Deixe url: "" para os assuntos que ainda não têm vídeo.
const videoLibrary = [
    { tag: '00', color: 'c-blue', title: 'Introdução ao AJURI Patrimônio', url: 'https://youtu.be/RINkFv5mI0w?si=1k110AzpQMDjcUnM' },
    { tag: '01', color: 'c-green', title: 'Recepção de NE/NF', url: '' },
    { tag: '02', color: 'c-yellow', title: 'Entrada no almoxarifado', url: '' },
    { tag: '03', color: 'c-blue', title: 'Tombamento', url: '' },
    { tag: '04', color: 'c-green', title: 'Transferência interna', url: '' },
    { tag: '05', color: 'c-yellow', title: 'Desfazimento', url: '' },
    { tag: '06', color: 'c-blue', title: 'Depreciação', url: '' },
    { tag: '07', color: 'c-green', title: 'Inventário', url: '' },
    { tag: '08', color: 'c-yellow', title: 'Virada de ano', url: '' },
];

function extractYouTubeId(url) {
    if (!url) return null;
    const patterns = [
        /youtu\.be\/([\w-]{11})/,
        /youtube\.com\/watch\?v=([\w-]{11})/,
        /youtube\.com\/embed\/([\w-]{11})/,
        /youtube\.com\/shorts\/([\w-]{11})/
    ];
    for (const re of patterns) {
        const m = url.match(re);
        if (m) return m[1];
    }
    return null;
}

function renderVideoGrid() {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;
    grid.innerHTML = videoLibrary.map((v, i) => {
        const id = extractYouTubeId(v.url);
        const thumb = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
        const disabled = !id;
        return `
      <div class="video-card ${disabled ? 'is-empty' : ''}" data-index="${i}" tabindex="0" role="button"
           aria-label="${disabled ? 'Vídeo ainda não cadastrado: ' : 'Assistir: '}${v.title}">
        <div class="video-thumb" ${thumb ? `style="background-image:url('${thumb}')"` : ''}>
          <span class="tag ${v.color}">${v.tag}</span>
          <span class="video-play">${disabled ? '' : `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          `}</span>
        </div>
        <div class="video-card-body">
          <h4>${v.title}</h4>
          <p>${disabled ? 'Vídeo ainda não cadastrado' : 'Assista ao tutorial no YouTube'}</p>
        </div>
      </div>`;
    }).join('');

    grid.querySelectorAll('.video-card:not(.is-empty)').forEach(card => {
        const open = () => openVideoModal(videoLibrary[card.dataset.index]);
        card.addEventListener('click', open);
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
}

const videoModal = document.getElementById('videoModal');
const videoModalFrame = document.getElementById('videoModalFrame');
const videoModalTitle = document.getElementById('videoModalTitle');

function openVideoModal(video) {
    const id = extractYouTubeId(video.url);
    if (!id || !videoModal) return;
    videoModalFrame.innerHTML = `<iframe width="100%" height="100%"
        src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0"
        title="${video.title}" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    videoModalTitle.textContent = video.title;
    videoModal.classList.add('show');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
}

function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('show');
    videoModal.setAttribute('aria-hidden', 'true');
    videoModalFrame.innerHTML = ''; // para o vídeo ao fechar
    document.body.classList.remove('no-scroll');
}

document.getElementById('videoModalClose')?.addEventListener('click', closeVideoModal);
document.getElementById('videoModalBackdrop')?.addEventListener('click', closeVideoModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideoModal(); });

renderVideoGrid();

// Scroll progress bar
const progressEl = document.getElementById('progress');
function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    progressEl.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + '%';
    document.getElementById('backTop').classList.toggle('show', scrolled > 500);
}
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Back to top
document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
function setSidebar(open) {
    sidebar.classList.toggle('open', open);
    sidebarOverlay.classList.toggle('show', open);
}
menuToggle.addEventListener('click', () => setSidebar(!sidebar.classList.contains('open')));
sidebarOverlay.addEventListener('click', () => setSidebar(false));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setSidebar(false); });
document.querySelectorAll('nav.toc a').forEach(a => {
    a.addEventListener('click', () => setSidebar(false));
});

// Scrollspy
const sections = document.querySelectorAll('section.chapter');
const navLinks = document.querySelectorAll('nav.toc a');
const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + id);
            });
        }
    });
}, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
sections.forEach(s => spy.observe(s));

// Sidebar filter
const filterInput = document.getElementById('filterInput');
filterInput.addEventListener('input', () => {
    const q = filterInput.value.trim().toLowerCase();
    navLinks.forEach(l => {
        const text = l.textContent.toLowerCase();
        l.style.display = text.includes(q) ? 'flex' : 'none';
    });
});