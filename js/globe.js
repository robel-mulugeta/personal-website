(function () {
  'use strict';

  // --- Configuration ---
  var ROTATION_SPEED = 0.15;
  var LAND_STROKE = 'rgba(17, 17, 17, 0.18)';
  var LAND_FILL = 'rgba(17, 17, 17, 0.04)';
  var SPHERE_STROKE = 'rgba(17, 17, 17, 0.08)';
  var SPHERE_FILL = '#F4F1EA';
  var GRATICULE_STROKE = 'rgba(17, 17, 17, 0.04)';
  var DOT_FILL = 'rgba(17, 17, 17, 0.55)';
  var DOT_RADIUS = 2.2;
  var DATA_URL = '../data/land-110m.json';

  // --- Family locations [longitude, latitude] ---
  var locations = [
    { coords: [38.7578, 9.0250] },
    { coords: [36.8219, -1.2921] },
    { coords: [29.1549, -19.0154] },
    { coords: [12.4964, 41.9028] },
    { coords: [13.4050, 52.5200] },
    { coords: [18.0686, 59.3293] },
    { coords: [24.9384, 60.1699] },
    { coords: [4.9041, 52.3676] },
    { coords: [10.7522, 59.9139] },
    { coords: [-79.3832, 43.6532] },
    { coords: [-74.0060, 40.7128] },
    { coords: [-77.0369, 38.9072] },
    { coords: [-83.0458, 42.3314] },
    { coords: [-84.3880, 33.7490] },
    { coords: [-86.7816, 36.1627] },
    { coords: [-93.2105, 44.9778] },
    { coords: [-93.6091, 41.5868] },
    { coords: [-97.7431, 30.2672] },
    { coords: [-104.9903, 39.7392] },
    { coords: [-122.3321, 47.6062] },
    { coords: [-122.2711, 37.8044] },
    { coords: [-118.2437, 34.0522] },
    { coords: [144.9631, -37.8136] }
  ];

  // --- State ---
  var canvas = document.getElementById('globe-canvas');
  var container = document.getElementById('globe-container');
  if (!canvas || !container) return;

  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var size = 280;
  var rotation = [0, -20, 0];
  var land = null;
  var animationId = null;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Projection ---
  var projection = d3.geoOrthographic()
    .precision(0.5);

  var path = d3.geoPath(projection, ctx);
  var graticule = d3.geoGraticule10();

  function setupCanvas() {
    var rect = container.getBoundingClientRect();
    size = Math.round(rect.width);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function updateProjection() {
    projection
      .translate([size / 2, size / 2])
      .scale(size / 2 - 2)
      .rotate(rotation);
  }

  function draw() {
    ctx.clearRect(0, 0, size, size);
    updateProjection();

    // Sphere background
    ctx.beginPath();
    path({ type: 'Sphere' });
    ctx.fillStyle = SPHERE_FILL;
    ctx.fill();
    ctx.strokeStyle = SPHERE_STROKE;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Graticule
    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = GRATICULE_STROKE;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Land masses
    if (land) {
      ctx.beginPath();
      path(land);
      ctx.fillStyle = LAND_FILL;
      ctx.fill();
      ctx.strokeStyle = LAND_STROKE;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Location dots
    var center = projection.invert([size / 2, size / 2]);
    for (var i = 0; i < locations.length; i++) {
      var loc = locations[i];
      var projected = projection(loc.coords);
      if (projected) {
        var dist = d3.geoDistance(loc.coords, center);
        if (dist < Math.PI / 2) {
          ctx.beginPath();
          ctx.arc(projected[0], projected[1], DOT_RADIUS, 0, 2 * Math.PI);
          ctx.fillStyle = DOT_FILL;
          ctx.fill();
        }
      }
    }
  }

  function animate() {
    rotation[0] += ROTATION_SPEED;
    draw();
    animationId = requestAnimationFrame(animate);
  }

  // Pause when tab hidden
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else {
      if (!animationId && land) {
        if (prefersReducedMotion) {
          draw();
        } else {
          animationId = requestAnimationFrame(animate);
        }
      }
    }
  });

  // Responsive resize
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      setupCanvas();
      draw();
    }, 200);
  });

  // Load data and start
  fetch(DATA_URL)
    .then(function (response) { return response.json(); })
    .then(function (topology) {
      land = topojson.feature(topology, topology.objects.land);
      setupCanvas();
      draw();
      container.classList.add('visible');

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(animate);
      }
    })
    .catch(function (err) {
      console.warn('Globe data failed to load:', err);
    });

})();
