const thumbs = document.querySelectorAll('.video-thumb');
const gridView = document.getElementById('videoGridView');
const playerView = document.getElementById('videoPlayerView');
const iframe = document.getElementById('youtubePlayer');
const backBtn = document.getElementById('backBtn');

// ABRIR VIDEO
function openVideo(slug, youtubeId, push = true) {
  gridView.classList.add('hidden');
  playerView.classList.remove('hidden');

  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;

  if (push) {
    history.pushState(
      { slug, youtubeId },
      '',
      `/harlem/${slug}`
    );
  }
}

// CLICK EN MINIATURA
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    openVideo(
      thumb.dataset.video,
      thumb.dataset.youtube
    );
  });
});

// BACK
backBtn.addEventListener('click', () => {
  iframe.src = '';
  playerView.classList.add('hidden');
  gridView.classList.remove('hidden');

  history.pushState({}, '', '/harlem');
});

// SOPORTAR REFRESH / URL DIRECTA
window.addEventListener('load', () => {
  const path = window.location.pathname.split('/');
  const slug = path[2]; // /harlem/slug

  if (!slug) return;

  const thumb = document.querySelector(
    `.video-thumb[data-video="${slug}"]`
  );

  if (thumb) {
    openVideo(
      slug,
      thumb.dataset.youtube,
      false
    );
  }
});
