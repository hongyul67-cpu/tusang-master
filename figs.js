/* ══════════════════════════════════════════════════════════════
   투상도 제3각법 마스터 — 그림 모음 (그림02 · 2026-09-30)
   공용 그리기 도우미 links/fig.js 를 쓴다. index.html(배우기 카드)과 lesson.js(슬라이드)가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', cards:['LEARN 카드 제목'…], draw:function(){ … } }
       cards — index.html 의 LEARN 카드 h 와 **똑같이**. 그 카드 안에 그림이 나온다(순서 = 이 파일 순서).
     ans:1 로 그린 글자 — 수업 슬라이드 요점의 {{빈칸}} 답·문제 답이 되는 글자. 슬라이드에서 labels:false 로 부르면 ? 로 가려진다.

   근거: 기초제도(씨마스 2015) 교과서 Ⅲ-2 정투상도 그리기 91~99쪽 · Ⅲ-4 특수 투상도 117~121쪽
     · 정투상 — 투상선이 투상면에 직각이고 서로 평행(91쪽 Tip) · 기본 투상면 입화면·평화면·측화면(91쪽)
     · 제3각법 = 눈 → 투상면 → 물체, 제1각법 = 눈 → 물체 → 투상면(93·95쪽)
     · 각법 기호(96쪽 그림 Ⅲ-11): 제3각법은 동심원이 왼쪽, 제1각법은 사다리꼴이 왼쪽
     · 등각 투상도 세 축 120°(117쪽) · 사투상도 정면은 실제 모양, 경사축 30·45·60°, 길이 1·3/4·1/2(119쪽)
     · 투시 투상도 — 소점으로 모인다(120~121쪽)
   교과서 그림 Ⅲ-6 은 세 치수를 「길이(가로) · 높이 · 너비(안쪽)」 라고 부르지만, 이 도구의 글은
   「가로 · 세로 · 너비」 를 섞어 쓴다. 그림에서는 헷갈리지 않게 **가로 · 높이 · 안쪽** 으로 적었다.
   입체의 크기 숫자는 넣지 않았다(모양만).
   ══════════════════════════════════════════════════════════════ */
var FIGS = (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C, t = F.t, line = F.line, box = F.box;
  var c30 = Math.cos(Math.PI / 6), s30 = 0.5;

  /* ── 입체: ㄴ자 블록 (가로 W · 안쪽 D · 높이 H, 왼쪽 a 만큼만 높다) ── */
  var W = 4, D = 2.6, H = 3, A = 1.6, H1 = 1.2;
  var PROF = [[0, 0], [W, 0], [W, H1], [A, H1], [A, H], [0, H]];   /* 정면 모양 (x, z) */

  var FILL = { top: C.blueL, front: C.grayL, side: C.grayM };
  function pg(pts, fill, o) {
    o = o || {};
    return F.poly(pts, { close: 1, fill: fill, c: o.c || C.ink, w: o.w || 1.8 });
  }
  /* 투상 방법 하나를 주면 ㄴ자 블록을 그린다. P(x,y,z) → [X,Y] */
  function lblock(P) {
    var s = '';
    function q(x, y, z) { return P(x, y, z); }
    /* 뒤로 가는 면 — 윗면 2개 · 오른쪽을 보는 면 2개 */
    s += pg([q(A, 0, H1), q(A, 0, H), q(A, D, H), q(A, D, H1)], FILL.side);
    s += pg([q(A, 0, H1), q(W, 0, H1), q(W, D, H1), q(A, D, H1)], FILL.top);
    s += pg([q(0, 0, H), q(A, 0, H), q(A, D, H), q(0, D, H)], FILL.top);
    s += pg([q(W, 0, 0), q(W, 0, H1), q(W, D, H1), q(W, D, 0)], FILL.side);
    s += pg(PROF.map(function (p) { return q(p[0], 0, p[1]); }), FILL.front);
    return s;
  }
  function isoP(ox, oy, k) { return function (x, y, z) { return [ox + k * c30 * (x + y), oy + k * s30 * (x - y) - k * z]; }; }
  function oblP(ox, oy, k) { /* 캐비닛도: 경사 45°, 안쪽 길이 1/2 */
    return function (x, y, z) { return [ox + k * x + k * 0.5 * y * 0.7071, oy - k * z - k * 0.5 * y * 0.7071]; };
  }
  function perP(ox, oy, k, vp) { /* 1점 투시: 안쪽으로 갈수록 소점 쪽으로 줄어든다 */
    return function (x, y, z) {
      var fx = ox + k * x, fy = oy - k * z, tt = y / D * 0.34;
      return [fx + (vp[0] - fx) * tt, fy + (vp[1] - fy) * tt];
    };
  }

  /* ── 3면도 한 장씩 (ox,oy = 그 투상도의 왼쪽 아래) ── */
  function vFront(ox, oy, k, o) {
    o = o || {};
    return F.poly(PROF.map(function (p) { return [ox + p[0] * k, oy - p[1] * k]; }), { close: 1, fill: o.fill || '#fff', w: o.w || 2.2 });
  }
  function vTop(ox, oy, k, o) {      /* 아래 변 = 앞쪽 */
    o = o || {};
    return box(ox, oy - D * k, W * k, D * k, { fill: o.fill || '#fff', r: 0, w: o.w || 2.2 }) +
      line(ox + A * k, oy - D * k, ox + A * k, oy, { w: o.w || 2.2 });
  }
  function vRight(ox, oy, k, o) {    /* 왼쪽 변 = 앞쪽 */
    o = o || {};
    return box(ox, oy - H * k, D * k, H * k, { fill: o.fill || '#fff', r: 0, w: o.w || 2.2 }) +
      line(ox, oy - H1 * k, ox + D * k, oy - H1 * k, { w: o.w || 2.2 });
  }
  function vLeft(ox, oy, k, o) {     /* 제1각법의 오른쪽 자리에 오는 것은 좌측면도 — 여기서는 모양 대신 이름만 쓴다 */
    o = o || {};
    return box(ox, oy - H * k, D * k, H * k, { fill: o.fill || '#fff', r: 0, w: o.w || 2.2 });
  }
  function eye(x, y, s) {
    s = s || 1;
    return F.path('M' + (x - 14 * s) + ',' + y + ' Q' + x + ',' + (y - 12 * s) + ' ' + (x + 14 * s) + ',' + y +
      ' Q' + x + ',' + (y + 12 * s) + ' ' + (x - 14 * s) + ',' + y + ' Z', { fill: '#fff', w: 1.8 }) +
      '<circle cx="' + (x + 3 * s) + '" cy="' + y + '" r="' + (5 * s) + '" fill="' + C.ink + '"/>';
  }
  function divider(x, y1, y2) { return line(x, y1, x, y2, { c: C.grayM, w: 1.4, dash: '6 5' }); }
  function ell(cx, cy, rx, ry, o) {
    o = o || {};
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (o.fill || 'none') +
      '" stroke="' + (o.c || C.ink) + '" stroke-width="' + (o.w || 2) + '"' + (o.dash ? ' stroke-dasharray="' + o.dash + '"' : '') + '/>';
  }

  return {

  /* ─────────── 투상도란? ─────────── */
  't-views': { cards: ['투상도란?'],
    cap: '투상도 — 입체 하나를 앞·위·오른쪽에서 똑바로 본 모양을 각각 그린다',
    draw: function () {
      var P = isoP(150, 160, 24), s = lblock(P);
      /* 보는 방향 화살표 */
      var fc = P(W * 0.45, 0, H1 * 0.55), tc = P(A * 0.5, D * 0.5, H), rc = P(W, D * 0.5, H1 * 0.5);
      s += F.arrow(fc[0] - 62, fc[1] + 36, fc[0] - 8, fc[1] + 5, { c: C.blue, w: 2.6 }) + F.num(fc[0] - 74, fc[1] + 44, 1, { c: C.blue });
      s += F.arrow(tc[0], tc[1] - 50, tc[0], tc[1] - 6, { c: C.green, w: 2.6 }) + F.num(tc[0], tc[1] - 62, 2, { c: C.green });
      s += F.arrow(rc[0] + 62, rc[1] + 36, rc[0] + 8, rc[1] + 5, { c: C.orange, w: 2.6 }) + F.num(rc[0] + 74, rc[1] + 44, 3, { c: C.orange });
      s += t(fc[0] - 74, fc[1] + 70, '앞', { a: 'm', b: 1, c: C.blue }) + t(tc[0] + 18, tc[1] - 62, '위', { b: 1, c: C.green }) +
        t(rc[0] + 74, rc[1] + 70, '오른쪽', { a: 'm', b: 1, c: C.orange });
      /* 본 모양 세 장 */
      var k = 17, y0 = 336;
      s += vFront(28, y0, k) + F.num(28, y0 - H * k - 16, 1, { c: C.blue }) + t(28 + W * k / 2, y0 + 20, '정면도', { a: 'm', b: 1, c: C.blue });
      s += vTop(178, y0, k) + F.num(178, y0 - D * k - 16, 2, { c: C.green }) + t(178 + W * k / 2, y0 + 20, '평면도', { a: 'm', b: 1, c: C.green });
      s += vRight(336, y0, k) + F.num(336, y0 - H * k - 16, 3, { c: C.orange }) + t(336 + D * k / 2, y0 + 20, '우측면도', { a: 'm', b: 1, c: C.orange });
      s += t(462, 70, '입체는', { a: 'e', size: 15, c: C.sub }) + t(462, 92, '한 장', { a: 'e', size: 15, c: C.sub }) +
        t(462, 262, '본 모양은', { a: 'e', size: 15, c: C.sub }) + t(462, 284, '세 장', { a: 'e', size: 15, c: C.sub });
      return F.svg(480, 372, s);
    } },

  /* ─────────── 투상법 4가지 ─────────── */
  't-proj4': { cards: ['투상법 4가지'],
    cap: '같은 ㄴ자 블록을 네 가지로 — 정투상(도면용) · 등각(세 축 120°) · 사투상(정면은 실제 모양) · 투시(멀수록 작게)',
    draw: function () {
      var s = divider(240, 14, 336) + line(14, 176, 466, 176, { c: C.grayM, w: 1.4, dash: '6 5' });
      /* ① 정투상 — 3면도 */
      var k = 13;
      s += t(120, 28, '정투상', { a: 'm', b: 1, size: 17, c: C.blue, ans: 1 });
      s += vTop(62, 84, k, { w: 1.8 }) + vFront(62, 140, k, { w: 1.8 }) + vRight(62 + W * k + 12, 140, k, { w: 1.8 });
      s += t(120, 160, '방향마다 따로 그린다', { a: 'm', size: 13, c: C.sub });
      /* ② 등각 */
      var P = isoP(300, 118, 15);
      s += t(360, 28, '등각 투상', { a: 'm', b: 1, size: 17, c: C.blue, ans: 1 });
      s += lblock(P);
      var O = P(W, 0, 0);
      s += t(360, 160, '세 축이 120°', { a: 'm', size: 13, c: C.sub });
      /* ③ 사투상 */
      var Q = oblP(58, 290, 22);
      s += t(120, 196, '사투상', { a: 'm', b: 1, size: 17, c: C.blue, ans: 1 });
      s += lblock(Q);
      s += F.callout(58 + 22 * 0.8, 290 - 22 * 0.5, 30, 322, '정면 = 실제 모양', { a: 's', size: 13, c: C.orange, tc: C.orange });
      /* ④ 투시 */
      var vp = [452, 214], R = perP(290, 300, 22, vp);
      s += t(360, 196, '투시 투상', { a: 'm', b: 1, size: 17, c: C.blue, ans: 1 });
      [[0, 0, H], [A, 0, H], [W, 0, H1], [W, 0, 0]].forEach(function (p) {
        var f = R(p[0], 0, p[2]); s += line(f[0], f[1], vp[0], vp[1], { c: C.orange, w: 1, dash: '4 4' });
      });
      s += lblock(R);
      s += '<circle cx="' + vp[0] + '" cy="' + vp[1] + '" r="4.5" fill="' + C.orange + '"/>' + t(vp[0], vp[1] - 16, '소점', { a: 'm', size: 13, b: 1, c: C.orange });
      s += t(360, 326, '멀수록 작아진다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 342, s);
    } },

  /* ─────────── 제3각법 — 투상면을 펼친다 ─────────── */
  't-unfold': { cards: ['우리가 쓰는 건 제3각법'],
    cap: '제3각법 — 물체를 유리 상자에 넣고 앞·위·옆 투상면에 그린 뒤, 정면을 기준으로 펼치면 3면도 배치가 된다',
    draw: function () {
      var s = '';
      /* 유리 상자: 물체보다 m 만큼 크다. 앞면(입화면) = y=-m, 윗면(평화면) = z=H+m, 오른쪽(측화면) = x=W+m */
      var m = 0.5, k = 19, P = isoP(34, 190, k);
      var x0 = -m, x1 = W + m, y0 = -m, y1 = D + m, z1 = H + m;
      function q(x, y, z) { return P(x, y, z); }
      /* 세 투상면 */
      s += pg([q(x0, y0, z1), q(x1, y0, z1), q(x1, y1, z1), q(x0, y1, z1)], C.greenL, { c: C.green, w: 1.4 });
      s += pg([q(x1, y0, 0), q(x1, y0, z1), q(x1, y1, z1), q(x1, y1, 0)], C.orangeL, { c: C.orange, w: 1.4 });
      s += pg([q(x0, y0, 0), q(x1, y0, 0), q(x1, y0, z1), q(x0, y0, z1)], C.blueL, { c: C.blue, w: 1.4 });
      /* 면 위에 그려진 투상도 */
      s += F.poly(PROF.map(function (p) { return q(p[0], y0, p[1]); }), { close: 1, c: C.ink, w: 2 });
      s += F.poly([q(0, 0, z1), q(W, 0, z1), q(W, D, z1), q(0, D, z1)], { close: 1, c: C.ink, w: 2 }) + F.poly([q(A, 0, z1), q(A, D, z1)], { c: C.ink, w: 2 });
      s += F.poly([q(x1, 0, 0), q(x1, 0, H), q(x1, D, H), q(x1, D, 0)], { close: 1, c: C.ink, w: 2 }) + F.poly([q(x1, 0, H1), q(x1, D, H1)], { c: C.ink, w: 2 });
      var a1 = q(W / 2, y0, -0.2), a2 = q(W / 2, D / 2, z1 + 0.2), a3 = q(x1 + 0.1, D * 0.9, H + 0.2);
      s += t(a1[0] - 16, a1[1] + 22, '입화면', { a: 'm', b: 1, c: C.blue, size: 15, ans: 1 });
      s += t(a2[0] - 6, a2[1] - 44, '평화면', { a: 'm', b: 1, c: C.green, size: 15, ans: 1 });
      s += t(a3[0] + 26, a3[1] + 70, '측화면', { a: 'm', b: 1, c: C.orange, size: 15, ans: 1 });
      /* 펼치는 화살표 */
      s += F.route([[220, 120], [242, 120], [266, 120]], { c: C.ink, w: 2.4 }) + t(244, 100, '펼친다', { a: 'm', size: 13, b: 1, c: C.sub });
      /* 펼친 배치 (제3각법) */
      var kk = 20, fx = 282, fy = 272, gap = 16;
      var ty = fy - H * kk - gap, rx = fx + W * kk + gap;
      s += vTop(fx, ty, kk, { fill: C.greenL }) + vFront(fx, fy, kk, { fill: C.blueL }) + vRight(rx, fy, kk, { fill: C.orangeL });
      s += t(fx + W * kk / 2, ty - D * kk - 18, '평면도 (위)', { a: 'm', b: 1, c: C.green, size: 15, ans: 1 });
      s += t(fx + W * kk / 2, fy + 20, '정면도', { a: 'm', b: 1, c: C.blue, size: 15, ans: 1 });
      s += t(rx + D * kk / 2, fy + 20, '우측면도', { a: 'm', b: 1, c: C.orange, size: 15, ans: 1 });
      s += t(rx + D * kk / 2, fy + 40, '(오른쪽)', { a: 'm', size: 13, c: C.orange, ans: 1 });
      return F.svg(480, 318, s);
    } },

  /* ─────────── 제1각법과 반대 ─────────── */
  't-order31': { cards: ['제1각법과 반대!'],
    cap: '투상면의 자리 — 제3각법은 눈과 물체 사이, 제1각법은 물체 뒤. 그래서 배치가 위아래·좌우로 뒤집힌다',
    draw: function () {
      var s = divider(240, 14, 334);
      function scheme(x, third) {
        var out = eye(x + 20, 96);
        var px = third ? x + 92 : x + 186, bx = third ? x + 138 : x + 80;
        out += box(bx, 76, 40, 40, { fill: C.grayM, r: 2, w: 1.6 });
        out += box(px - 4, 50, 8, 92, { fill: C.blueL, c: C.blue, r: 2, w: 1.6 });
        out += F.arrow(x + 38, 96, (third ? px - 8 : bx - 4), 96, { c: C.sub, w: 1.6, head: 9 });
        out += t(x + 20, 132, '눈', { a: 'm', size: 14, b: 1 });
        out += t(bx + 20, 132, '물체', { a: 'm', size: 14, b: 1 });
        out += t(px, 160, '투상면', { a: 'm', size: 14, b: 1, c: C.blue });
        return out;
      }
      s += t(112, 28, '제3각법', { a: 'e', b: 1, size: 17, c: C.blue }) + t(120, 28, '(KS)', { b: 1, size: 17, c: C.blue, ans: 1 });
      s += scheme(14, true);
      s += t(360, 28, '제1각법', { a: 'm', b: 1, size: 17 });
      s += scheme(254, false);
      s += t(120, 186, '눈 → 투상면 → 물체', { a: 'm', b: 1, size: 15, c: C.blue });
      s += t(360, 186, '눈 → 물체 → 투상면', { a: 'm', b: 1, size: 15 });
      /* 배치 비교 */
      function vb(x, y, w, fill, col, name) { return box(x, y, w, 30, { fill: fill, c: col, r: 3, w: 1.6, label: name, size: 13 }); }
      s += vb(58, 262, 66, C.blueL, C.blue, '정면도') + vb(58, 224, 66, C.greenL, C.green, '평면도') + vb(132, 262, 78, C.orangeL, C.orange, '우측면도');
      s += vb(356, 262, 66, C.blueL, C.blue, '정면도') + vb(356, 300, 66, C.greenL, C.green, '평면도') + vb(270, 262, 78, C.orangeL, C.orange, '우측면도');
      s += t(120, 318, '평면도 위 · 우측면도 오른쪽', { a: 'm', size: 13, c: C.sub, b: 1 });
      s += t(360, 222, '평면도 아래 · 우측면도 왼쪽', { a: 'm', size: 13, c: C.sub, b: 1 });
      return F.svg(480, 346, s);
    } },

  /* ─────────── 각법 기호 ─────────── */
  't-mark': { cards: ['제1각법과 반대!'],
    cap: '각법 기호 — 원뿔대를 옆(사다리꼴)과 끝(동심원)에서 본 모양. 제3각법은 동심원이 왼쪽, 제1각법은 사다리꼴이 왼쪽',
    draw: function () {
      var s = divider(240, 14, 150);
      function circles(cx, cy) {
        return F.circle(cx, cy, 30, { fill: 'none', w: 2.2 }) + F.circle(cx, cy, 15, { fill: 'none', w: 2.2 }) +
          line(cx, cy - 40, cx, cy + 40, { c: C.sub, w: 1, dash: 'center' });
      }
      function trap(x, cy) { /* 작은 쪽(높이 30)이 왼쪽, 큰 쪽(높이 60)이 오른쪽 */
        return F.poly([[x, cy - 15], [x + 66, cy - 30], [x + 66, cy + 30], [x, cy + 15]], { close: 1, w: 2.2 });
      }
      var cy = 84;
      s += circles(58, cy) + trap(118, cy) + line(18, cy, 200, cy, { c: C.sub, w: 1, dash: 'center' });
      s += t(120, 140, '제3각법 기호', { a: 'm', b: 1, c: C.blue, size: 16, ans: 1 });
      s += trap(270, cy) + circles(412, cy) + line(256, cy, 462, cy, { c: C.sub, w: 1, dash: 'center' });
      s += t(360, 140, '제1각법 기호', { a: 'm', b: 1, size: 16, ans: 1 });
      s += t(58, 28, '동심원', { a: 'm', size: 13, c: C.sub }) + t(151, 28, '사다리꼴', { a: 'm', size: 13, c: C.sub });
      s += t(303, 28, '사다리꼴', { a: 'm', size: 13, c: C.sub }) + t(412, 28, '동심원', { a: 'm', size: 13, c: C.sub });
      /* 표제란의 투상 칸 */
      var y = 176, x = 70;
      s += box(x, y, 340, 40, { fill: '#fff', r: 0, w: 1.6 });
      [60, 150, 210, 280].forEach(function (dx) { s += line(x + dx, y, x + dx, y + 40, { w: 1.4 }); });
      s += t(x + 30, y + 20, '척도', { a: 'm', size: 14 }) + t(x + 105, y + 20, '1 : 1', { a: 'm', size: 14 }) +
        t(x + 180, y + 20, '투상', { a: 'm', size: 14, b: 1, c: C.blue });
      s += F.g(F.circle(0, 0, 9, { fill: 'none', w: 1.4 }) + F.circle(0, 0, 4.5, { fill: 'none', w: 1.4 }) +
        F.poly([[16, -4.5], [36, -9], [36, 9], [16, 4.5]], { close: 1, w: 1.4 }), { x: x + 228, y: y + 20 });
      s += t(x + 310, y + 20, '…', { a: 'm', size: 14, c: C.sub });
      s += t(240, y + 58, '표제란의 「투상」 칸에 글자나 기호로 적는다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 250, s);
    } },

  /* ─────────── 3면도 읽는 요령 — 치수 공유 ─────────── */
  't-align': { cards: ['3면도 읽는 요령'],
    cap: '세 투상도는 치수를 나눠 갖는다 — 정면도·평면도는 가로, 정면도·우측면도는 높이, 평면도·우측면도는 안쪽 길이가 같다',
    draw: function () {
      var k = 26, fx = 62, fy = 262, gap = 24;
      var ty = fy - H * k - gap, rx = fx + W * k + gap, s = '';
      /* 연결선 */
      [fx, fx + W * k].forEach(function (x) { s += line(x, ty + 6, x, fy - H * k - 4, { c: C.line, w: 1, dash: '4 4' }); });
      [fy, fy - H * k].forEach(function (y) { s += line(fx + W * k + 4, y, rx - 4, y, { c: C.line, w: 1, dash: '4 4' }); });
      s += vTop(fx, ty, k) + vFront(fx, fy, k) + vRight(rx, fy, k);
      /* 가로 */
      s += F.dim(fx, ty - D * k, fx + W * k, ty - D * k, '가로', { off: 16, c: C.blue, ans: 1 });
      s += F.dim(fx, fy, fx + W * k, fy, '가로', { off: 18, side: -1, c: C.blue, ans: 1 });
      /* 높이 */
      s += F.dim(fx, fy - H * k, fx, fy, '높이', { off: 18, c: C.green, ans: 1 });
      s += F.dim(rx + D * k, fy - H * k, rx + D * k, fy, '높이', { off: 18, side: -1, c: C.green, ans: 1 });
      /* 안쪽 */
      s += F.dim(fx, ty - D * k, fx, ty, '안쪽', { off: 18, c: C.orange, ans: 1 });
      s += F.dim(rx, fy - H * k, rx + D * k, fy - H * k, '안쪽', { off: 16, c: C.orange, ans: 1 });
      s += t(fx + W * k / 2, ty - D * k / 2, '평면도', { a: 'm', size: 13, c: C.sub });
      s += t(fx + W * k * 0.62, fy - H1 * k / 2, '정면도', { a: 'm', size: 13, c: C.sub });
      s += t(rx + D * k / 2, fy - H1 * k / 2, '우측면도', { a: 'm', size: 13, c: C.sub });
      var lx = 330;
      s += t(lx, 44, '정면도 = 평면도', { size: 14, b: 1 }) + t(lx, 64, '→ 가로가 같다', { size: 14, b: 1, c: C.blue, ans: 1 });
      s += t(lx, 100, '정면도 = 우측면도', { size: 14, b: 1 }) + t(lx, 120, '→ 높이가 같다', { size: 14, b: 1, c: C.green, ans: 1 });
      s += t(lx, 156, '평면도 = 우측면도', { size: 14, b: 1 }) + t(lx, 176, '→ 안쪽 길이가 같다', { size: 14, b: 1, c: C.orange, ans: 1 });
      s += t(lx, 300, '- - 연결선', { size: 13, c: C.sub });
      return F.svg(480, 316, s);
    } },

  /* ─────────── 원기둥을 세우면 ─────────── */
  't-cyl': { cards: ['3면도 읽는 요령'],
    cap: '세운 원기둥 — 앞에서 보면 사각형(정면도), 위에서 보면 원(평면도)',
    draw: function () {
      var cx = 110, top = 70, h = 124, rx = 58, ry = 22, s = '';
      s += F.path('M' + (cx - rx) + ',' + top + ' V' + (top + h) + ' A' + rx + ',' + ry + ' 0 0 0 ' + (cx + rx) + ',' + (top + h) + ' V' + top + ' Z', { fill: C.grayL, w: 2.2 });
      s += ell(cx, top, rx, ry, { fill: C.blueL, w: 2.2 });
      s += line(cx, top - ry - 14, cx, top + h + ry + 12, { c: C.sub, w: 1, dash: 'center' });
      s += t(cx, 250, '세워 둔 원기둥', { a: 'm', b: 1, size: 15 });
      s += F.arrow(cx + 96, 144, cx + 150, 144, { c: C.ink, w: 2.2 });
      /* 제3각법 배치: 평면도(위) — 정면도(아래) */
      var vx = 350, r = 46;
      s += F.circle(vx, 64, r, { fill: C.blueL, w: 2.2 }) + line(vx - r - 12, 64, vx + r + 12, 64, { c: C.sub, w: 1, dash: 'center' }) +
        line(vx, 64 - r - 10, vx, 64 + r + 10, { c: C.sub, w: 1, dash: 'center' });
      s += box(vx - r, 132, 2 * r, 96, { fill: C.grayL, r: 0, w: 2.2 }) + line(vx, 124, vx, 236, { c: C.sub, w: 1, dash: 'center' });
      s += t(vx + r + 16, 58, '평면도', { b: 1, size: 15 }) + t(vx + r + 16, 80, '= 원', { b: 1, size: 15, c: C.blue });
      s += t(vx + r + 16, 170, '정면도', { b: 1, size: 15 }) + t(vx + r + 16, 192, '= 사각형', { b: 1, size: 15, c: C.blue });
      return F.svg(480, 266, s);
    } },

  /* ─────────── 숨은선 ─────────── */
  't-hidden': { cards: ['3면도 읽는 요령'],
    cap: '숨은선 — 앞쪽이 높고 뒤쪽이 낮으면, 뒤쪽 모서리는 앞에서 가려진다. 가려진 모서리는 파선으로 그린다',
    draw: function () {
      /* 앞은 높고(0~d1) 뒤는 낮은(d1~DD) 블록 — 오른쪽에서 보면 계단 */
      var WW = 3.4, DD = 3.4, d1 = 1.3, HH = 2.4, h1 = 0.9, P = isoP(70, 180, 24), s = '';
      function q(x, y, z) { return P(x, y, z); }
      s += pg([q(0, d1, h1), q(WW, d1, h1), q(WW, DD, h1), q(0, DD, h1)], FILL.top);
      s += pg([q(0, 0, HH), q(WW, 0, HH), q(WW, d1, HH), q(0, d1, HH)], FILL.top);
      s += pg([q(0, 0, 0), q(WW, 0, 0), q(WW, 0, HH), q(0, 0, HH)], FILL.front);
      s += pg([q(WW, 0, 0), q(WW, 0, HH), q(WW, d1, HH), q(WW, d1, h1), q(WW, DD, h1), q(WW, DD, 0)], FILL.side);
      /* 가려지는 모서리를 비쳐 보이게(빨간 파선) */
      s += F.poly([q(0, d1, h1), q(WW, d1, h1)], { c: C.red, w: 2, dash: '6 4' });
      var e1 = q(WW * 0.35, d1, h1);
      s += F.callout(e1[0], e1[1], 96, 44, '가려지는 모서리', { a: 's', size: 14, c: C.red, tc: C.red, b: 1 });
      var f0 = q(WW * 0.4, 0, HH * 0.4);
      s += F.arrow(f0[0] - 48, f0[1] + 42, f0[0] - 6, f0[1] + 8, { c: C.blue, w: 2.4 }) + t(f0[0] - 60, f0[1] + 50, '앞', { a: 'm', b: 1, c: C.blue });
      /* 정면도 */
      var k = 30, vx = 318, vy = 214;
      s += box(vx, vy - HH * k, WW * k, HH * k, { fill: '#fff', r: 0, w: 2.2 });
      s += line(vx, vy - h1 * k, vx + WW * k, vy - h1 * k, { c: C.ink, w: 1.6, dash: 'hidden' });
      s += t(vx + WW * k / 2, vy + 22, '정면도', { a: 'm', b: 1 });
      s += F.callout(vx + WW * k * 0.7, vy - h1 * k, 440, 80, '숨은선 (파선)', { a: 'e', size: 14, c: C.red, tc: C.red, b: 1, ans: 1 });
      return F.svg(480, 250, s);
    } }

  };
})();
