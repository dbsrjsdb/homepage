// Observe content, not the viewport-sized body, so a frame can shrink as well as grow.
const shell = document.querySelector('main');
const footer = document.querySelector('body > footer');
let pending = false;
function reportHeight() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    pending = false;
    const bottom = Math.max(
      shell?.getBoundingClientRect().bottom || 0,
      footer?.getBoundingClientRect().bottom || 0,
    );
    parent.postMessage(
      { type: 'scriptapp:height', height: Math.ceil(bottom + scrollY + 8) },
      location.origin,
    );
  });
}
const observer = new ResizeObserver(reportHeight);
if (shell) observer.observe(shell);
if (footer) observer.observe(footer);
addEventListener('load', reportHeight);
reportHeight();

addEventListener('message', (event) => {
  if (
    event.origin === location.origin &&
    event.source === parent &&
    event.data?.type === 'scriptapp:measure'
  )
    reportHeight();
});
