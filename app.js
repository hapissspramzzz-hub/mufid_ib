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
