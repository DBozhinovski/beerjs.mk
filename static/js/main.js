/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('bubbles', '/js/bubbles.json', function() {
  console.log('callback - particles.js config loaded');
});

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}