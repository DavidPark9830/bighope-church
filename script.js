const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#copy-address').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('대구광역시 달서구 달구벌대로332길 72');
    status.textContent = '주소가 복사되었습니다.';
  } catch {
    status.textContent = '주소를 길게 누르거나 선택하여 복사해 주세요.';
  }
});
if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-20% 0px -50% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

const documentTrack = document.querySelector('#document-track');
const documentPrev = document.querySelector('#document-prev');
const documentNext = document.querySelector('#document-next');

function updateDocumentControls() {
  const maxScroll = documentTrack.scrollWidth - documentTrack.clientWidth;
  documentPrev.disabled = documentTrack.scrollLeft <= 2;
  documentNext.disabled = documentTrack.scrollLeft >= maxScroll - 2;
}

function scrollDocuments(direction) {
  const card = documentTrack.querySelector('.document-card');
  const trackStyle = getComputedStyle(documentTrack);
  const gap = Number.parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;
  const distance = card.getBoundingClientRect().width + gap;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  documentTrack.scrollBy({
    left: direction * distance,
    behavior: reducedMotion ? 'auto' : 'smooth'
  });
}

documentPrev.addEventListener('click', () => scrollDocuments(-1));
documentNext.addEventListener('click', () => scrollDocuments(1));
documentTrack.addEventListener('scroll', updateDocumentControls, { passive: true });
window.addEventListener('resize', updateDocumentControls);
requestAnimationFrame(updateDocumentControls);

const pdfDialog = document.querySelector('#pdf-dialog');
const pdfFrame = document.querySelector('#pdf-frame');
const pdfTitle = document.querySelector('#pdf-dialog-title');
const pdfOpen = document.querySelector('#pdf-open');
const pdfDownload = document.querySelector('#pdf-download');

document.querySelectorAll('.document-preview').forEach(button => {
  button.addEventListener('click', () => {
    const pdf = button.dataset.pdf;
    const title = button.dataset.title;
    pdfTitle.textContent = title;
    pdfFrame.src = `${pdf}#view=FitH`;
    pdfFrame.title = `${title} 미리보기`;
    pdfOpen.href = pdf;
    pdfDownload.href = pdf;
    pdfDialog.showModal();
  });
});

document.querySelector('#pdf-dialog-close').addEventListener('click', () => pdfDialog.close());
pdfDialog.addEventListener('click', event => {
  if (event.target === pdfDialog) pdfDialog.close();
});
pdfDialog.addEventListener('close', () => {
  pdfFrame.removeAttribute('src');
});
