(function () {
  'use strict';

  var allImages = [
    '/collage/Kokeb menu page 1.png',
    '/collage/Kokeb menu page 2.png',
    '/collage/eh3iwyov6lthyqxs6i9b.jpg',
    '/collage/4500.jpg.webp',
    '/collage/Yankees_Mariners_Baseball.jpg',
    '/collage/accdc66ac9497b3e81a301a0bdfeaced278bdfed.jpg',
    '/collage/19825fedwaySeahawk.jpg.webp',
    '/collage/caption.jpg',
    '/collage/images.jpg',
    '/collage/Albert-and-Little-Richard-press-page.jpg',
    '/collage/IMG_2639.jpg',
    '/collage/STARDUST.jpg',
    '/collage/IMG_2703.JPG',
    '/collage/IMG_2720.JPG',
    '/collage/IMG_2895.JPG',
    '/collage/IMG_0029.JPG',
    '/collage/IMG_0030.JPG',
    '/collage/IMG_0031.JPG',
    '/collage/IMG_0032.JPG',
    '/collage/IMG_0034.JPG',
    '/collage/IMG_0035.JPG',
    '/collage/1990.jpg',
    '/collage/On this Date.JPG',
    '/collage/IMG_0039.JPG',
    '/collage/IMG_0041.JPG',
    '/collage/Image.png',
    '/collage/Journey.jpeg',
    '/collage/Image.jpeg',
    '/collage/ali.jpeg',
    '/collage/abebe.jpeg',
    '/collage/jobs.jpeg',
    '/collage/bill nye.jpeg',
    '/collage/nelson.jpeg',
    '/collage/serena.jpeg',
    '/collage/0bbd8eedcca4aee36d7d2927cae56f1c1927a139.jpg',
    '/collage/1608242586-dilla-issue-17-jdoutside.jpg',
    '/collage/JFG.avif',
    '/collage/Salehe.avif',
    '/collage/jamal shake and bake.jpg',
    '/collage/jordan shot.webp',
    '/collage/kryptonate.webp',
    '/collage/wales bonner.jpg',
    '/collage/download.webp',
    '/collage/magnolia trees uw.jpeg',
    '/collage/topboy sully.webp',
    '/collage/MJ personally.jpg',
    '/collage/urkel.webp',
    '/collage/19825fedwaySeahawk.jpg.jpg',
    '/collage/2004_Oprah-Winfrey.webp',
    '/collage/soyinka.jpg',
    '/collage/usain.jpg',
    '/collage/detroit street art.jpeg'
  ];

  // Width options for floating photos — height determined by natural aspect ratio
  var widths = [180, 210, 240, 270, 300, 340];

  var canvas = document.getElementById('collage-canvas');
  var triggered = false;
  var photos = []; // active floating photo objects
  var pool = [];   // shuffled queue of image srcs
  var poolIndex = 0;
  var MAX_PHOTOS = 14;
  var SPAWN_INTERVAL = 1400;

  // Mouse influence on drift direction
  var mouseX = 0.5; // normalized 0-1, 0.5 = center
  var mouseY = 0.5;

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function refillPool() {
    pool = shuffle(allImages);
    poolIndex = 0;
  }

  function nextImage() {
    if (poolIndex >= pool.length) refillPool();
    return pool[poolIndex++];
  }

  function pickWidth() {
    return widths[Math.floor(Math.random() * widths.length)];
  }

  function pickEdgeSpawn(w, h) {
    // Spawn from any edge
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var edge = Math.floor(Math.random() * 4);
    var x, y;

    if (edge === 0) {        // top
      x = Math.random() * (vw - w);
      y = -h - 20;
    } else if (edge === 1) { // bottom
      x = Math.random() * (vw - w);
      y = vh + 20;
    } else if (edge === 2) { // left
      x = -w - 20;
      y = Math.random() * (vh - h);
    } else {                 // right
      x = vw + 20;
      y = Math.random() * (vh - h);
    }

    return { x: x, y: y };
  }

  function getDrift() {
    // Direction influenced by cursor: opposite of cursor position
    // mouseX=0.8 (right) => drift left (negative x)
    // mouseY=0.2 (top) => drift down (positive y)
    var dx = (0.5 - mouseX) * 2.0; // range -1 to 1
    var dy = (0.5 - mouseY) * 2.0;

    // Add some randomness
    dx += (Math.random() - 0.5) * 0.6;
    dy += (Math.random() - 0.5) * 0.6;

    // Normalize to a consistent speed
    var mag = Math.sqrt(dx * dx + dy * dy);
    if (mag < 0.1) {
      dx = (Math.random() - 0.5) * 2;
      dy = (Math.random() - 0.5) * 2;
      mag = Math.sqrt(dx * dx + dy * dy);
    }
    var speed = 0.8 + Math.random() * 0.4;
    dx = (dx / mag) * speed;
    dy = (dy / mag) * speed;

    return { dx: dx, dy: dy };
  }

  function spawnPhoto() {
    var src = nextImage();
    var w = pickWidth();
    var drift = getDrift();
    var rotation = (Math.random() * 10 - 5).toFixed(1);

    // Preload image to get natural dimensions
    var img = new Image();
    img.src = src;
    img.alt = '';

    function create(naturalW, naturalH) {
      var aspect = naturalH / naturalW;
      var h = Math.round(w * aspect);

      var spawn = pickEdgeSpawn(w, h);

      var el = document.createElement('div');
      el.className = 'collage-item';
      el.style.width = w + 'px';
      el.style.left = spawn.x + 'px';
      el.style.top = spawn.y + 'px';
      el.style.setProperty('--rotation', 'rotate(' + rotation + 'deg)');

      el.appendChild(img);
      canvas.appendChild(el);

      var photo = {
        el: el,
        x: spawn.x,
        y: spawn.y,
        w: w,
        h: h,
        dx: drift.dx,
        dy: drift.dy,
        opacity: 0,
        phase: 'entering',
        life: 0
      };

      photos.push(photo);
    }

    if (img.naturalWidth) {
      create(img.naturalWidth, img.naturalHeight);
    } else {
      img.onload = function () {
        create(img.naturalWidth, img.naturalHeight);
      };
    }
  }

  function isOffScreen(p) {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var margin = 80;
    return p.x < -p.w - margin || p.x > vw + margin ||
           p.y < -p.h - margin || p.y > vh + margin;
  }

  function updatePhotos() {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var toRemove = [];

    for (var i = 0; i < photos.length; i++) {
      var p = photos[i];
      p.life++;

      // Gently blend drift toward current cursor-driven direction
      var target = getDrift();
      p.dx += (target.dx - p.dx) * 0.003;
      p.dy += (target.dy - p.dy) * 0.003;

      p.x += p.dx;
      p.y += p.dy;

      // Phase management
      if (p.phase === 'entering') {
        p.opacity = Math.min(1, p.opacity + 0.015);
        // Once fully visible and inside viewport, switch to visible
        var insideX = p.x > -p.w * 0.5 && p.x < vw - p.w * 0.5;
        var insideY = p.y > -p.h * 0.5 && p.y < vh - p.h * 0.5;
        if (p.opacity >= 1 && insideX && insideY) {
          p.phase = 'visible';
        }
      } else if (p.phase === 'visible') {
        // Eventually start fading when heading off screen
        if (isOffScreen(p)) {
          p.phase = 'exiting';
        }
      } else if (p.phase === 'exiting') {
        p.opacity = Math.max(0, p.opacity - 0.02);
        if (p.opacity <= 0) {
          toRemove.push(i);
        }
      }

      // Force remove if way off screen
      if (p.life > 100 && isOffScreen(p)) {
        p.phase = 'exiting';
        p.opacity = Math.max(0, p.opacity - 0.04);
        if (p.opacity <= 0) {
          if (toRemove.indexOf(i) === -1) toRemove.push(i);
        }
      }

      p.el.style.left = p.x + 'px';
      p.el.style.top = p.y + 'px';
      p.el.style.opacity = p.opacity;
    }

    // Remove dead photos (iterate backwards)
    for (var r = toRemove.length - 1; r >= 0; r--) {
      var idx = toRemove[r];
      photos[idx].el.remove();
      photos.splice(idx, 1);
    }

    requestAnimationFrame(updatePhotos);
  }

  function startSpawning() {
    // Initial batch: stagger a few photos
    var initialCount = 10 + Math.floor(Math.random() * 3); // 10-12
    for (var i = 0; i < initialCount; i++) {
      (function (delay) {
        setTimeout(spawnPhoto, delay);
      })(i * 400);
    }

    // Continuously spawn new photos
    setInterval(function () {
      if (photos.length < MAX_PHOTOS) {
        spawnPhoto();
      }
    }, SPAWN_INTERVAL);
  }

  function onFirstInteraction() {
    if (triggered) return;
    triggered = true;

    refillPool();
    startSpawning();
    requestAnimationFrame(updatePhotos);

    document.removeEventListener('mousemove', onFirstMove);
    document.removeEventListener('touchstart', onFirstTouch);
  }

  function onFirstMove(e) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    onFirstInteraction();
  }

  function onFirstTouch() {
    onFirstInteraction();
  }

  // Track mouse continuously for drift direction
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  document.addEventListener('mousemove', onFirstMove);
  document.addEventListener('touchstart', onFirstTouch, { passive: true });

})();
