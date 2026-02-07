// Global scroll functions
window.scrollUp = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.scrollDown = function() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};
