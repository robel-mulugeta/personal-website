(function () {
  'use strict';

  // Don't init on touch-only devices
  if ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches) return;

  var dot = document.createElement('div');
  dot.className = 'custom-cursor';
  document.body.appendChild(dot);

  var mx = -100, my = -100;
  var cx = -100, cy = -100;
  var hovered = false;
  var currentColor = '';

  // Palette of colors to cycle through when hovering photos
  var colors = [
    '#E63946', // red
    '#457B9D', // steel blue
    '#2A9D8F', // teal
    '#E9C46A', // gold
    '#F4A261', // sandy orange
    '#264653', // dark teal
    '#6A4C93', // purple
    '#1D3557', // navy
    '#A8DADC', // powder blue
    '#F1FAEE'  // off white
  ];
  var colorIndex = 0;

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

  // Detect hovering over images/photos
  document.addEventListener('mouseover', function (e) {
    var target = e.target;
    if (isPhotoElement(target)) {
      hovered = true;
      colorIndex = (colorIndex + 1) % colors.length;
      currentColor = colors[colorIndex];
      dot.style.backgroundColor = currentColor;
      dot.style.width = '18px';
      dot.style.height = '18px';
      dot.style.mixBlendMode = 'normal';
    }
  });

  document.addEventListener('mouseout', function (e) {
    var target = e.target;
    if (isPhotoElement(target)) {
      hovered = false;
      dot.style.backgroundColor = 'var(--text)';
      dot.style.width = '10px';
      dot.style.height = '10px';
      dot.style.mixBlendMode = 'difference';
    }
  });

  function isPhotoElement(el) {
    if (!el) return false;
    var tag = el.tagName;
    if (tag === 'IMG' || tag === 'VIDEO') return true;
    // Check parent containers
    if (el.closest && (
      el.closest('.collage-item') ||
      el.closest('.album-cover') ||
      el.closest('.polaroid') ||
      el.closest('.misc-video')
    )) return true;
    return false;
  }

  // Smooth follow with lerp
  function tick() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    dot.style.transform = 'translate(' + cx + 'px, ' + cy + 'px)';
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
