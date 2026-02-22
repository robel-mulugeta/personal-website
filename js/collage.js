(function () {
  'use strict';

  // Paired images that must stay adjacent
  var kokebPair = [
    'collage/Kokeb menu page 1.png',
    'collage/Kokeb menu page 2.png'
  ];

  // All other images
  var soloImages = [
    'collage/eh3iwyov6lthyqxs6i9b.jpg',
    'collage/4500.jpg.webp',
    'collage/Yankees_Mariners_Baseball.jpg',
    'collage/accdc66ac9497b3e81a301a0bdfeaced278bdfed.jpg',
    'collage/19825fedwaySeahawk.jpg.webp',
    'collage/caption.jpg',
    'collage/images.jpg',
    'collage/Albert-and-Little-Richard-press-page.jpg',
    'collage/IMG_2639.jpg',
    'collage/STARDUST.jpg',
    'collage/IMG_2703.JPG',
    'collage/IMG_2720.JPG',
    'collage/IMG_2895.JPG',
    'collage/IMG_0029.JPG',
    'collage/IMG_0030.JPG',
    'collage/IMG_0031.JPG',
    'collage/IMG_0032.JPG',
    'collage/IMG_0034.JPG',
    'collage/IMG_0035.JPG',
    'collage/1990.jpg',
    'collage/On this Date.JPG',
    'collage/IMG_0039.JPG',
    'collage/IMG_0041.JPG',
    'collage/Image.png',
    'collage/Journey.jpeg',
    'collage/Image.jpeg',
    'collage/ali.jpeg',
    'collage/abebe.jpeg',
    'collage/jobs.jpeg',
    'collage/bill nye.jpeg',
    'collage/nelson.jpeg',
    'collage/serena.jpeg',
    'collage/0bbd8eedcca4aee36d7d2927cae56f1c1927a139.jpg',
    'collage/1608242586-dilla-issue-17-jdoutside.jpg'
  ];

  // Custom object-position for specific images
  var imagePositions = {
    'collage/images.jpg': 'left center',
    'collage/IMG_0031.JPG': 'center 20%'
  };

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

  var canvas = document.getElementById('collage-canvas');
  var heading = document.querySelector('.collage-heading');
  var triggered = false;

  function getNavRect() {
    var nav = document.querySelector('.nav');
    if (!nav) return null;
    var rect = nav.getBoundingClientRect();
    var padding = 30;
    return {
      left: rect.left - padding,
      right: rect.right + padding,
      top: rect.top - padding,
      bottom: rect.bottom + padding
    };
  }

  function getHeadingRect() {
    if (!heading) return null;
    var rect = heading.getBoundingClientRect();
    var padding = 20;
    return {
      left: rect.left - padding,
      right: rect.right + padding,
      top: rect.top - padding,
      bottom: rect.bottom + padding
    };
  }

  function overlapsZone(x, y, w, h, zone) {
    if (!zone) return false;
    return x + w > zone.left && x < zone.right &&
           y + h > zone.top && y < zone.bottom;
  }

  function getRandomRotation() {
    return (Math.random() * 12 - 6).toFixed(1);
  }

  function spawnAllImages() {
    if (triggered) return;
    triggered = true;

    // Shuffle solo images, then insert the Kokeb pair at a random position together
    var shuffledSolo = shuffle(soloImages);
    var kokebIndex = Math.floor(Math.random() * (shuffledSolo.length + 1));
    var finalList = [];
    for (var s = 0; s < shuffledSolo.length; s++) {
      if (s === kokebIndex) {
        finalList.push(kokebPair[0]);
        finalList.push(kokebPair[1]);
      }
      finalList.push(shuffledSolo[s]);
    }
    if (kokebIndex >= shuffledSolo.length) {
      finalList.push(kokebPair[0]);
      finalList.push(kokebPair[1]);
    }

    var count = finalList.length;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var navZone = getNavRect();
    var headingZone = getHeadingRect();

    // Calculate grid
    var cols = Math.ceil(Math.sqrt(count * (vw / vh)));
    var rows = Math.ceil(count / cols);
    var cellW = vw / cols;
    var cellH = vh / rows;

    var imgW = Math.round(cellW * 0.85);
    var imgH = Math.round(cellH * 0.85);
    if (imgW > 280) imgW = 280;
    if (imgH > 260) imgH = 260;

    // Build cell positions and shuffle them
    var cells = [];
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        cells.push({ col: c, row: r });
      }
    }
    cells = shuffle(cells);

    // Find Kokeb indices and assign them adjacent cells
    var kokeb1Idx = -1;
    var kokeb2Idx = -1;
    for (var k = 0; k < finalList.length; k++) {
      if (finalList[k] === kokebPair[0]) kokeb1Idx = k;
      if (finalList[k] === kokebPair[1]) kokeb2Idx = k;
    }

    // Ensure Kokeb pages get neighboring cells
    if (kokeb1Idx >= 0 && kokeb2Idx >= 0 && kokeb1Idx < cells.length && kokeb2Idx < cells.length) {
      var cell1 = cells[kokeb1Idx];
      // Find a cell adjacent to cell1 and swap it into kokeb2's slot
      for (var a = 0; a < cells.length; a++) {
        if (a === kokeb1Idx || a === kokeb2Idx) continue;
        var candidate = cells[a];
        if (Math.abs(candidate.col - cell1.col) <= 1 && Math.abs(candidate.row - cell1.row) <= 1 &&
            !(candidate.col === cell1.col && candidate.row === cell1.row)) {
          // Swap this adjacent cell into kokeb2's position
          var tmp = cells[kokeb2Idx];
          cells[kokeb2Idx] = cells[a];
          cells[a] = tmp;
          break;
        }
      }
    }

    for (var i = 0; i < count; i++) {
      (function (index) {
        var delay = 50 + Math.random() * 50;

        setTimeout(function () {
          var cell = cells[index];
          var rotation = getRandomRotation();
          var src = finalList[index];

          var sizeVariation = 0.8 + Math.random() * 0.4;
          var w = Math.round(imgW * sizeVariation);
          var h = Math.round(imgH * sizeVariation);

          var cellX = cell.col * cellW;
          var cellY = cell.row * cellH;
          var maxOffsetX = Math.max(0, cellW - w);
          var maxOffsetY = Math.max(0, cellH - h);
          var x = Math.round(cellX + Math.random() * maxOffsetX);
          var y = Math.round(cellY + Math.random() * maxOffsetY);

          // If overlapping nav or heading, try random positions anywhere
          var attempts = 0;
          while (attempts < 40 && (
            overlapsZone(x, y, w, h, navZone) ||
            overlapsZone(x, y, w, h, headingZone)
          )) {
            x = Math.floor(Math.random() * (vw - w));
            y = Math.floor(Math.random() * (vh - h));
            attempts++;
          }

          if (x + w > vw) x = vw - w;
          if (y + h > vh) y = vh - h;
          if (x < 0) x = 0;
          if (y < 0) y = 0;

          var el = document.createElement('div');
          el.className = 'collage-item';
          el.style.width = w + 'px';
          el.style.height = h + 'px';
          el.style.left = x + 'px';
          el.style.top = y + 'px';
          el.style.zIndex = index + 1;
          el.style.setProperty('--rotation', 'rotate(' + rotation + 'deg)');
          el.style.animationDelay = (index * 0.06) + 's';

          var img = document.createElement('img');
          img.src = src;
          img.alt = '';

          // Apply custom object-position if specified
          if (imagePositions[src]) {
            img.style.objectPosition = imagePositions[src];
          }

          el.appendChild(img);
          canvas.appendChild(el);
        }, index * delay);
      })(i);
    }
  }

  function onFirstInteraction() {
    spawnAllImages();
    document.removeEventListener('mousemove', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
  }

  document.addEventListener('mousemove', onFirstInteraction);
  document.addEventListener('touchstart', onFirstInteraction, { passive: true });

})();
