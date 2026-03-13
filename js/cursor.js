(function () {
  'use strict';

  // Don't init on touch-only devices
  if ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches) return;

  var dot = document.createElement('div');
  dot.className = 'custom-cursor';
  document.body.appendChild(dot);

  var mx = -100, my = -100;
  var cx = -100, cy = -100;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
  });

  document.addEventListener('mouseenter', function () {
    dot.style.opacity = '1';
  });

  document.addEventListener('mouseleave', function () {
    dot.style.opacity = '0';
  });

  // Smooth follow with lerp
  function tick() {
    cx += (mx - cx) * 0.35;
    cy += (my - cy) * 0.35;
    dot.style.transform = 'translate(' + cx + 'px, ' + cy + 'px)';
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
