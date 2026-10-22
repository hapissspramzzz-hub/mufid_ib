const dialog = document.querySelector('.story-dialog');
const title = dialog.querySelector('h2');
const story = dialog.querySelector('.story-text');
const closeButton = dialog.querySelector('.dialog-close');
document.querySelectorAll('.evidence').forEach((card) => {
  card.addEventListener('click', () => {
    title.textContent = card.querySelector('.evidence-caption b').textContent;
    story.textContent = card.dataset.story;
    dialog.showModal();
  });
});
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && dialog.open) dialog.close();
});

// Nearby points lift softly under the pointer, like raised prints.
function addDotField(surface) {
  let dotCanvas = surface.querySelector('.dot-canvas');
  if (!dotCanvas) {
    dotCanvas = document.createElement('canvas');
    dotCanvas.className = 'dot-canvas';
    dotCanvas.setAttribute('aria-hidden', 'true');
    surface.prepend(dotCanvas);
  }
  dotCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0';
  const ctx = dotCanvas.getContext('2d');
  let pointer = { x: -1000, y: -1000 };

  function paintDots() {
    const rect = surface.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    dotCanvas.width = Math.round(rect.width * dpr);
    dotCanvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    for (let y = 13; y < rect.height; y += 25) {
      for (let x = 12; x < rect.width; x += 25) {
        const dx = x - pointer.x, dy = y - pointer.y;
        const lift = Math.max(0, 1 - Math.hypot(dx, dy) / 72);
        ctx.beginPath();
        ctx.arc(x, y - lift * 4, 1.05 + lift * 1.15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,240,229,${0.34 + lift * 0.55})`;
        if (lift > 0.08) {
          ctx.shadowColor = 'rgba(238,225,196,.8)';
          ctx.shadowBlur = 5 + lift * 9;
        } else ctx.shadowBlur = 0;
        ctx.fill();
      }
    }
    ctx.shadowBlur = 0;
  }

  surface.addEventListener('pointermove', (event) => {
    const rect = surface.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    paintDots();
  });
  surface.addEventListener('pointerleave', () => {
    pointer = { x: -1000, y: -1000 };
    paintDots();
  });
  new ResizeObserver(paintDots).observe(surface);
  paintDots();
}

addDotField(document.querySelector('.board'));
addDotField(document.querySelector('.profile'));


const warningDialog = document.querySelector('.warning-dialog');
const warningMessage = warningDialog.querySelector('.warning-message');
const warningClose = warningDialog.querySelector('.warning-close');
document.querySelectorAll('.case-photo').forEach((photo) => {
  photo.addEventListener('click', () => {
    warningMessage.textContent = photo.dataset.warning || 'PERINGATAN: Jangan sentuh barang bukti ini.';
    warningDialog.showModal();
  });
});
warningClose.addEventListener('click', () => warningDialog.close());
warningDialog.addEventListener('click', (event) => {
  if (event.target === warningDialog) warningDialog.close();
});
