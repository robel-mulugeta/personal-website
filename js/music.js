/* ==========================================================================
   Music Page — Cursor-driven album placement
   Albums emerge along the cursor path like laying vinyl on a floor.
   ========================================================================== */

(function () {
  'use strict';

  // --- Album Data (with hardcoded artwork URLs) ---
  const albums = [
    { title: 'Songs in the Key of Life', artist: 'Stevie Wonder',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/eb/1f/12/eb1f12ec-474c-63aa-43af-09282f423b9d/00602537004737.rgb.jpg/600x600bb.jpg' },
    { title: 'Telefone', artist: 'Noname',
      art: null },
    { title: 'Wede Harer Guzo', artist: 'Dahlak Band',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/8a/13/89/8a1389b7-844a-490f-b53d-67cfee59ce46/656605345567.jpg/600x600bb.jpg' },
    { title: 'A Love Supreme', artist: 'John Coltrane',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/e5/24/aa/e524aacd-467b-66f3-8931-0fcd6750a4b9/08UMGIM07914.rgb.jpg/600x600bb.jpg' },
    { title: 'My Life', artist: 'Mary J. Blige',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f8/8c/9a/f88c9a3f-64cd-9a3a-3a82-f2a7f732ce9c/19UMGIM98447.rgb.jpg/600x600bb.jpg' },
    { title: 'All Eyez on Me', artist: '2Pac',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/55/e5/7c/55e57cf2-8325-a088-7d54-3aeedad1143f/21UM1IM16263.rgb.jpg/600x600bb.jpg' },
    { title: 'Illmatic', artist: 'Nas',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b9/eb/cc/b9ebccbc-5ba4-2cdb-5332-b065739abd9a/886444567619.jpg/600x600bb.jpg' },
    { title: 'Pray for Haiti', artist: 'Mach-Hommy',
      art: null },
    { title: 'In My Mind', artist: 'Pharrell',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/88/9e/e8/889ee8d9-ea22-2b89-4f3d-ba6c68f201b1/13UABIM56978.rgb.jpg/600x600bb.jpg' },
    { title: 'Flower Boy', artist: 'Tyler, The Creator',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/fd/fd/8c/fdfd8c26-b8f9-4768-41d3-b24773250c65/886446605814.jpg/600x600bb.jpg' },
    { title: 'Donuts', artist: 'J Dilla',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/63/d3/c5/63d3c537-ac30-86e7-8e69-8a03a5346209/792.jpg/600x600bb.jpg' },
    { title: 'Voodoo', artist: "D'Angelo",
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e9/b9/9e/e9b99e73-58a5-1e31-f57c-b11e78419dcf/16UMGIM86249.rgb.jpg/600x600bb.jpg' },
    { title: 'Sonder', artist: 'Brent Faiyaz',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a5/ce/c5/a5cec51d-2d2a-3947-3772-1a17efffc43a/199976895281.png/600x600bb.jpg' },
    { title: 'Big Conspiracy', artist: 'J Hus',
      art: null },
    { title: 'Injury Reserve', artist: 'Injury Reserve',
      art: null },
    { title: 'Sometimes I Might Be Introvert', artist: 'Little Simz',
      art: null },
    { title: "Mama's Gun", artist: 'Erykah Badu',
      art: null },
    { title: 'Live', artist: 'Donny Hathaway',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/56/27/d8/5627d82f-b54c-60d6-5140-ed049ef44ada/075678027222.jpg/600x600bb.jpg' },
    { title: 'Ramona Park Broke My Heart', artist: 'Vince Staples',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/71/a5/27/71a527a8-5470-1b53-19d7-b9805537de0e/22UMGIM15334.rgb.jpg/600x600bb.jpg' },
    { title: 'Spaceships on the Blade', artist: 'Larry June',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/5b/25/82/5b2582f2-3322-a6c9-a88c-744cebe89def/194690924385_cover.jpg/600x600bb.jpg' },
    { title: 'The Great Escape', artist: 'Larry June',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/3b/91/23/3b9123e1-4f5c-6f3d-f48e-75fe9c541250/197342066716_cover.jpg/600x600bb.jpg' },
    { title: 'Orange Print', artist: 'Larry June',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1b/fb/7d/1bfb7db2-5bde-c2b8-feee-6576650408a1/194690517006_cover.jpg/600x600bb.jpg' },
    { title: 'The Night Shift', artist: 'Larry June',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/99/46/24/994624a8-0675-bdef-f47e-0358b1ed7b9c/197342407366_cover.jpg/600x600bb.jpg' },
    { title: 'Doing It For Me', artist: 'Larry June',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a5/f7/c6/a5f7c655-fa44-505b-07ea-f93b4cd4c375/197342641784_cover.jpg/600x600bb.jpg' },
    { title: 'A Good Night in the Ghetto', artist: 'Kamaiyah',
      art: null },
    { title: 'Exodus', artist: 'Bob Marley',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/23/fa/f8/23faf820-c4fa-2bf1-d672-846971f5cf5c/06UMGIM31355.rgb.jpg/600x600bb.jpg' },
    { title: "Aster's Ballads", artist: 'Aster Aweke',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music/ee/02/7c/mzi.njiveyjt.tif/600x600bb.jpg' },
    { title: 'Electric Ladyland', artist: 'Jimi Hendrix',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/b8/45/a6b84589-6ff7-a462-9ff9-170b724980d5/dj.wjkdwlks.jpg/600x600bb.jpg' },
    { title: 'Zion IV', artist: '9th Wonder',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/2a/3c/c3/2a3cc32b-8fbf-259b-0157-0936ed37d8dc/194690082993_cover.jpg/600x600bb.jpg' },
    { title: 'The College Dropout', artist: 'Kanye West',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/15/05/09/15050911-a2f1-9ebc-0d16-6e8faad1cf80/00602567924326.rgb.jpg/600x600bb.jpg' },
    { title: 'Malibu', artist: 'Anderson .Paak',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/04/f0/3204f09c-4580-3880-7f5f-254dfa4d258f/888915184455_cover.jpg/600x600bb.jpg' },
    { title: 'Gemini Rights', artist: 'Steve Lacy',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/f4/b4/c4/f4b4c458-e52c-859b-fdef-2600dd4fe768/196589380630.jpg/600x600bb.jpg' },
    { title: 'Ego Death', artist: 'The Internet',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/84/ac/4c/84ac4c29-45f4-9eb4-fd16-1e507eb6dc5e/886445301649.jpg/600x600bb.jpg' },
    { title: 'Shea Butter Baby', artist: 'Ari Lennox',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d6/c5/e2/d6c5e298-89a3-d07c-45f6-6d075f821d37/19UMGIM38109.rgb.jpg/600x600bb.jpg' },
    { title: 'Reality Show', artist: 'Jazmine Sullivan',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5a/3b/02/5a3b02ac-ea31-9df6-34f7-0186b941846d/886444622172.jpg/600x600bb.jpg' },
    { title: 'Channel Orange', artist: 'Frank Ocean',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/04/f8/63/04f863fc-2852-604f-c910-a97ac069506b/12UMGIM40339.rgb.jpg/600x600bb.jpg' },
    { title: 'Blonde', artist: 'Frank Ocean',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/45/68/bb4568f3-68cd-619d-fbcb-4e179916545d/BlondCover-Final.jpg/600x600bb.jpg' },
    { title: 'Pray for Paris', artist: 'Westside Gunn',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8f/bf/b2/8fbfb2d9-6ef2-951a-c6cd-26495e9c23e1/dj.vbothjgo.jpg/600x600bb.jpg' },
    { title: 'The Albion Files', artist: 'Terrace Martin',
      art: null },
    { title: 'Velvet Portraits', artist: 'Terrace Martin',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/df/ae/03/dfae0311-1791-1739-f1c3-6beb5a709a55/824833010889_cover.jpg/600x600bb.jpg' },
    { title: '3 Feet High and Rising', artist: 'De La Soul',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/17/43/a2/1743a2ab-0630-6527-cca5-a73d855df4a1/810098505963.png/600x600bb.jpg' },
    { title: 'Rose in the Dark', artist: 'Cleo Sol',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a4/d3/aa/a4d3aadc-014d-7cdc-5e8b-ec0dcf2bf12b/859734840785_cover.jpg/600x600bb.jpg' },
    { title: 'New Beginning', artist: 'SWV',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music/d4/0a/78/mzi.igvesjep.jpg/600x600bb.jpg' },
    { title: 'Diamond Life', artist: 'Sade',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4d/d5/a1/4dd5a1b7-7134-f0ec-b55c-54ac47cc88a5/886448655886.jpg/600x600bb.jpg' },
    { title: 'Share My World', artist: 'Mary J. Blige',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/80/05/b8/8005b825-34b2-c0dd-3ecf-cfbe7baf10b1/06UMGIM21088.rgb.jpg/600x600bb.jpg' },
    { title: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9a/50/a1/9a50a1d8-01c2-2504-8d99-3f2fc7e5c2ff/12UMGIM52988.rgb.jpg/600x600bb.jpg' },
    { title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/b5/a6/91/b5a69171-5232-3d5b-9c15-8963802f83dd/15UMGIM15814.rgb.jpg/600x600bb.jpg' },
    { title: 'DeBÍ TiRAR MáS FOToS', artist: 'Bad Bunny',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/90/5e/7e/905e7ed5-a8fa-a8f3-cd06-0028fdf3afaa/199066342442.jpg/600x600bb.jpg' },
    { title: 'Luz', artist: 'Djavan',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a1/7e/31/a17e31a0-1969-6d81-4e6c-6eb4e9492d73/5099747630224.jpg/600x600bb.jpg' },
    { title: 'The Dark Side of the Moon', artist: 'Pink Floyd',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3e/76/b0/3e76b0e3-762b-2286-a019-8afb19cee541/886445635829.jpg/600x600bb.jpg' },
    { title: 'Salad Days', artist: 'Mac DeMarco',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4b/5c/83/4b5c833d-2160-bc68-0905-5b91d2b6732a/817949019495.jpg/600x600bb.jpg' },
    { title: 'In Rainbows', artist: 'Radiohead',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dd/50/c7/dd50c790-99ac-d3d0-5ab8-e3891fb8fd52/634904032463.png/600x600bb.jpg' },
    { title: 'IGOR', artist: 'Tyler, The Creator',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0c/06/05/0c060581-6242-6a2a-a677-20170f2cf8da/886447710180.jpg/600x600bb.jpg' },
    { title: 'Call Me If You Get Lost', artist: 'Tyler, The Creator',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/65/47/0a/65470a4c-a70f-4a0b-f77b-3edb39e9097a/886449377039.jpg/600x600bb.jpg' },
    { title: 'CHROMAKOPIA', artist: 'Tyler, The Creator',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b6/ef/ee/b6efeefa-fc99-37d1-ad21-0d769b2a4958/196872796971.jpg/600x600bb.jpg' },
    { title: 'Kind of Blue', artist: 'Miles Davis',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music/7f/9f/d6/mzi.vtnaewef.jpg/600x600bb.jpg' },
    { title: 'Bitches Brew', artist: 'Miles Davis',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9b/e1/63/9be1630c-486d-760c-76cf-04282174700a/074646577424.jpg/600x600bb.jpg' },
    { title: 'Sketches of Spain', artist: 'Miles Davis',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/cd/86/0c/cd860cb5-675b-2466-158d-487ace32e717/886444505321.jpg/600x600bb.jpg' },
    { title: 'Mulatu of Ethiopia', artist: 'Mulatu Astatke',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Features/b9/c0/eb/dj.lpehbjql.jpg/600x600bb.jpg' },
    { title: 'Anti', artist: 'Rihanna',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/9c/da/90/9cda90c9-df1a-078b-319c-bdf2801e8d1f/16UMGIM03373.rgb.jpg/600x600bb.jpg' },
    { title: 'Vince Staples', artist: 'Vince Staples',
      art: null },
    { title: 'Care for Me', artist: 'Saba',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e3/46/a6/e346a6dc-0540-27ff-53f0-69cc668a0cec/artwork.jpg/600x600bb.jpg' },
    { title: 'Black on Both Sides', artist: 'Mos Def',
      art: null },
    { title: 'Fantastic, Vol. 2', artist: 'Slum Village',
      art: null },
    { title: 'The Low End Theory', artist: 'A Tribe Called Quest',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/14/c8/e014c80a-425b-e01a-1124-cee985bcb5e6/dj.qafpkddz.jpg/600x600bb.jpg' },
    { title: 'Midnight Marauders', artist: 'A Tribe Called Quest',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/d1/90/11/d1901153-4595-7f2f-12d2-661be9eef883/012414149022.jpg/600x600bb.jpg' },
    { title: "What's Going On", artist: 'Marvin Gaye',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/76/36/2d/76362d74-cb7a-8ef9-104e-cde1d858e9a9/20UMGIM95279.rgb.jpg/600x600bb.jpg' },
    { title: 'Back to Black', artist: 'Amy Winehouse',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/5a/72/3f/5a723fec-965d-3483-89f8-d66b79f88419/15UMGIM24224.rgb.jpg/600x600bb.jpg' },
    { title: 'Ctrl', artist: 'SZA',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a2/bc/ad/a2bcad46-b389-4be1-8bac-5a0959b0b8e4/886446548449.jpg/600x600bb.jpg' },
    { title: 'Room 25', artist: 'Noname',
      art: null },
    { title: 'Heaven', artist: 'Cleo Sol',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/bc/bd/2b/bcbd2b44-712a-1283-717a-49747a7c65f3/859777883749_cover.jpg/600x600bb.jpg' },
    { title: 'Gold', artist: 'Cleo Sol',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/46/4c/82/464c824d-8708-daad-66ff-22e826478de4/859778415147_cover.jpg/600x600bb.jpg' },
    { title: 'Mother', artist: 'Cleo Sol',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/42/43/43/424343f4-7ef4-7d12-be44-fb24cc0d0137/859748545218_cover.jpg/600x600bb.jpg' },
    { title: 'Stillness in Wonderland', artist: 'Little Simz',
      art: 'https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/8d/ca/de/8dcadedf-3d9d-70b1-3012-e809502bb7b6/5060384611662.jpg/600x600bb.jpg' },
    { title: 'Grey Area', artist: 'Little Simz',
      art: null },
    { title: 'Zombie', artist: 'Fela Kuti',
      art: null },
    { title: 'Expensive Shit', artist: 'Fela Kuti',
      art: null },
    { title: 'Gentleman', artist: 'Fela Kuti',
      art: null },
    { title: 'Water No Get Enemy', artist: 'Fela Kuti',
      art: null },
  ];

  // --- Fetch album art from iTunes Search API (fallback for albums without hardcoded art) ---
  async function fetchAlbumArt(album) {
    try {
      const query = encodeURIComponent(album.artist + ' ' + album.title);
      const resp = await fetch(
        'https://itunes.apple.com/search?term=' + query + '&entity=album&limit=1'
      );
      const data = await resp.json();

      if (data.results && data.results.length > 0) {
        return data.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
      }
    } catch (e) {
      // Silently fail — placeholder will show
    }
    return null;
  }

  // --- Shuffle (Fisher-Yates) ---
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // --- State ---
  let shuffled = shuffle(albums);
  let currentIndex = 0;
  let lastX = null;
  let lastY = null;
  const MIN_DISTANCE = 80;
  const canvas = document.getElementById('music-canvas');
  const musicQuote = document.querySelector('.music-heading');
  let quoteHidden = false;

  // --- Helpers ---
  function getRandomRotation() {
    return (Math.random() * 16 - 8).toFixed(1);
  }

  function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  // --- Create text-based placeholder with canvas ---
  function createPlaceholderCanvas(album, size) {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');

    const hue = hashCode(album.title) % 360;
    ctx.fillStyle = 'hsl(' + hue + ', 20%, 35%)';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'bold ' + (size * 0.07) + 'px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const words = album.title.split(' ');
    const lines = [];
    let line = '';
    const maxWidth = size * 0.8;

    words.forEach(function (word) {
      const test = line + (line ? ' ' : '') + word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    lines.push(line);

    const lineHeight = size * 0.1;
    const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach(function (l, i) {
      ctx.fillText(l, size / 2, startY + i * lineHeight);
    });

    ctx.font = (size * 0.055) + 'px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillText(album.artist, size / 2, startY + lines.length * lineHeight + size * 0.05);

    return c.toDataURL();
  }

  function createCoverElement(album, artUrl, x, y) {
    const el = document.createElement('div');
    el.className = 'album-cover';
    const rotation = getRandomRotation();
    el.style.setProperty('--rotation', 'rotate(' + rotation + 'deg)');

    const size = window.innerWidth <= 480 ? 100 : window.innerWidth <= 768 ? 120 : 160;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = (x - size / 2) + 'px';
    el.style.top = (y - size / 2) + 'px';

    const img = document.createElement('img');
    img.alt = album.title + ' by ' + album.artist;
    img.title = album.title + ' — ' + album.artist;
    img.loading = 'lazy';
    img.src = artUrl;
    // If the image fails to load, remove the cover entirely
    img.onerror = function () {
      el.remove();
    };

    el.appendChild(img);
    canvas.appendChild(el);

    // Performance: limit total covers on screen
    const covers = canvas.querySelectorAll('.album-cover');
    if (covers.length > 80) {
      var oldest = covers[0];
      oldest.style.transition = 'opacity 1.2s ease';
      oldest.style.opacity = '0';
      setTimeout(function () { oldest.remove(); }, 1200);
    }
  }

  function isNearNav(x, y) {
    var nav = document.querySelector('.nav');
    if (!nav) return false;
    var rect = nav.getBoundingClientRect();
    var padding = 20;
    return x >= rect.left - padding && x <= rect.right + padding &&
           y >= rect.top - padding && y <= rect.bottom + padding;
  }

  function placeAlbum(x, y) {
    if (isNearNav(x, y)) return;

    if (!quoteHidden && musicQuote) {
      musicQuote.style.opacity = '0';
      quoteHidden = true;
    }

    if (currentIndex >= shuffled.length) {
      shuffled = shuffle(albums);
      currentIndex = 0;
    }

    const album = shuffled[currentIndex];
    currentIndex++;

    if (album.art) {
      // Use hardcoded artwork URL
      createCoverElement(album, album.art, x, y);
    } else {
      // No hardcoded art — try iTunes API, skip if not found
      fetchAlbumArt(album).then(function (url) {
        if (url) {
          createCoverElement(album, url, x, y);
        }
      });
    }
  }

  // --- Mouse Events ---
  canvas.addEventListener('mousemove', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    if (lastX === null || lastY === null) {
      lastX = x;
      lastY = y;
      placeAlbum(x, y);
      return;
    }

    if (distance(lastX, lastY, x, y) >= MIN_DISTANCE) {
      placeAlbum(x, y);
      lastX = x;
      lastY = y;
    }
  });

  // --- Touch Events (Mobile) ---
  canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
    var touch = e.touches[0];
    placeAlbum(touch.clientX, touch.clientY);
  }, { passive: false });

  canvas.addEventListener('touchmove', function (e) {
    e.preventDefault();
    var touch = e.touches[0];
    var x = touch.clientX;
    var y = touch.clientY;

    if (lastX === null || lastY === null) {
      lastX = x;
      lastY = y;
      return;
    }

    if (distance(lastX, lastY, x, y) >= MIN_DISTANCE * 0.7) {
      placeAlbum(x, y);
      lastX = x;
      lastY = y;
    }
  }, { passive: false });

})();
