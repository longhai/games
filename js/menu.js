const menu = document.getElementById('menu');
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('show');
      menuOverlay.classList.toggle('show');
      menuToggle.classList.toggle('hide');
    });
    menuOverlay.addEventListener('click', function() {
      menu.classList.remove('show');
      menuOverlay.classList.remove('show');
      menuToggle.classList.remove('hide');
    });
	window.onload = () => {
  toggleMode();
};