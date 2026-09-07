/* ══════════════════════════════════════════════════════════════
   투상도 마스터 — 수업 슬라이드 원고
   화면은 links 의 공용 board-pro.js 가 그린다. 이 파일은 원고만 담는다.

   ▸ 근거 자료 (실제로 열어서 확인한 것만 옮겼다)
     · 기초제도(씨마스 2015개정) 교과서 PDF
       「Ⅲ. 제도의 기본 도법 — 2. 정투상도 그리기」 91~99쪽
       「Ⅲ. 제도의 기본 도법 — 4. 특수 투상도 그리기」 117~121쪽
     · 같은 단원의 강의용 PPT (Ⅲ_02 36장 · Ⅲ_04 17장)
     · 용어는 교과서 표기 그대로 쓴다 — 입화면 · 평화면 · 측화면 · 투상선 · 투상면 ·
       기본 6면도 · 투상각 · 각법의 표시법 · 축측 투상도 · 사투상도 · 투시 투상도

   ▸ 그림은 도구가 이미 가진 SVG 를 그대로 부른다 (수업슬라이드 규격 5)
     index.html 의 projFig · layout3rd · layout1st · figGlassBox · fig6View ·
     figAngleMark · figViewPick · figPlaceLong · figAlign · figTusangSummary 를
     window.TFIG 로 받아 쓴다. 여기서 다시 그리지 않는다.
     슬라이드에만 필요한 그림 5개만 아래 「새로 그린 것」에 있다.

   ▸ 배우기 카드(LEARN 5장)는 그대로 둔다. 슬라이드는 별도의 한 벌이다.
   ══════════════════════════════════════════════════════════════ */
(function () {
'use strict';

/* ── 이 도구의 SVG 는 어두운 바탕에 밝은 선이라 칠판 위에서 그대로 보인다.
      (밝은 종이 그림을 쓰는 도구와 달리 배경을 되돌릴 필요가 없다)
      다만 그림 칸이 flex 항목이라 폭을 못 박지 않으면 SVG 가 기본 300px 로 쭈그러든다. */
var st = document.createElement('style');
st.textContent =
  '#bp .bp-fig{background:#0f1a27;border-color:#2f3b4f}' +
  '#bp .bp-fig .lfig{flex:1 1 100%;width:100%;min-width:0;display:flex;gap:2.4vw;' +
  '  align-items:center;justify-content:center}' +
  '#bp .bp-fig .lfig>div{flex:1;min-width:0;text-align:center}' +
  /* 높이를 막지 않으면 가로가 넓어진 만큼 세로도 커져 슬라이드에 스크롤이 생긴다. */
  '#bp .bp-fig svg{width:100%;height:auto;max-height:30vh}' +
  '#bp-in.compact .bp-fig svg{max-height:18vh}' +
  /* 폰 폭에서는 그림을 더 줄인다 — 안 줄이면 요점 + 퀴즈가 한 화면에 안 들어간다 */
  '@media(max-width:640px){#bp .bp-fig svg{max-height:20vh}' +
  '  #bp-in.compact .bp-fig svg{max-height:13vh}' +
  '  #bp .bp-fig .lfig{gap:8px}}' +
  '#bp .bp-fig .lcap{color:#93a2ba;font-weight:800;margin-top:3px;' +
  '  font-size:clamp(11px,1vw,17px)}';
document.head.appendChild(st);

/* 도구가 가진 그림을 부른다 — 없으면 빈 문자열(슬라이드는 글만으로도 돈다) */
function T(name, args) {
  var F = window.TFIG || {};
  try { return F[name] ? F[name].apply(null, args || []) : ''; } catch (e) { return ''; }
}
/* 그림 한 칸 / 두 칸 나란히 */
function one(svg) { return '<div class="lfig"><div>' + svg + '</div></div>'; }
function two(a, ca, b, cb) {
  return '<div class="lfig">' +
    '<div>' + a + '<div class="lcap">' + ca + '</div></div>' +
    '<div>' + b + '<div class="lcap">' + cb + '</div></div></div>';
}
function S(w, h, body) {
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' + body + '</svg>';
}

/* ══════════ 새로 그린 것 — 슬라이드에만 필요한 그림 5개 ══════════
   교과서에는 그림으로 있는데 도구에는 없던 대목이다. */
var NEW = {};

/* ① 투상선 — 정투상은 직각·평행, 투시는 한 점으로 모인다 (교과서 91쪽 Tip) */
NEW.ray = S(230, 96,
  '<text class="lbl acc" x="56" y="10" text-anchor="middle" style="font-size:7px">정투상</text>' +
  '<line class="ln ln-thin" x1="86" y1="16" x2="86" y2="86"/>' +
  '<rect class="face-f" x="24" y="34" width="20" height="30"/>' +
  '<path class="ln ln-thin" d="M44 34 H86 M44 49 H86 M44 64 H86" stroke-dasharray="4,3"/>' +
  '<path class="ln ln-outline" d="M86 34 V64"/>' +
  '<text class="lbl" x="56" y="94" text-anchor="middle" style="font-size:6px">투상선이 투상면에 직각 · 서로 평행</text>' +
  '<text class="lbl acc" x="172" y="10" text-anchor="middle" style="font-size:7px">투시 투상</text>' +
  '<line class="ln ln-thin" x1="196" y1="16" x2="196" y2="86"/>' +
  '<rect class="face-f" x="134" y="34" width="20" height="30"/>' +
  '<circle cx="222" cy="49" r="2.4" fill="var(--accent)"/>' +
  '<path class="ln ln-thin" d="M134 34 L222 49 M134 64 L222 49 M154 34 L222 49 M154 64 L222 49" stroke-dasharray="4,3"/>' +
  '<text class="lbl" x="172" y="94" text-anchor="middle" style="font-size:6px">투상선이 한 점(시점)으로 모임</text>');

/* ② 투상각 — 수평면과 수직면이 만나 공간이 4개로 나뉜다 (교과서 93쪽 그림 Ⅲ-5) */
NEW.quad = S(150, 108,
  '<line class="ln ln-outline" x1="16" y1="54" x2="134" y2="54"/>' +
  '<line class="ln ln-outline" x1="75" y1="10" x2="75" y2="98"/>' +
  '<text class="lbl acc" x="106" y="34" text-anchor="middle" style="font-size:11px">1</text>' +
  '<text class="lbl" x="44" y="34" text-anchor="middle" style="font-size:11px">2</text>' +
  '<text class="lbl acc" x="44" y="82" text-anchor="middle" style="font-size:11px">3</text>' +
  '<text class="lbl" x="106" y="82" text-anchor="middle" style="font-size:11px">4</text>' +
  '<text class="lbl" x="75" y="106" text-anchor="middle" style="font-size:6px">수평면 · 수직면이 만나 생긴 네 개의 각 = 투상각</text>');

/* ③ 점 · 선 · 면의 투상 (교과서 94~95쪽) */
NEW.pls = S(214, 96,
  /* 점 */
  '<text class="lbl acc" x="34" y="12" text-anchor="middle" style="font-size:7px">점의 투상</text>' +
  '<rect class="ln ln-thin" x="10" y="20" width="48" height="48"/>' +
  '<circle cx="34" cy="44" r="3.4" fill="var(--accent)"/>' +
  '<text class="lbl" x="34" y="82" text-anchor="middle" style="font-size:6px">언제나 점</text>' +
  /* 선 */
  '<text class="lbl acc" x="107" y="12" text-anchor="middle" style="font-size:7px">선의 투상</text>' +
  '<rect class="ln ln-thin" x="83" y="20" width="48" height="48"/>' +
  '<line class="ln ln-outline" x1="93" y1="52" x2="121" y2="52"/>' +
  '<circle cx="107" cy="32" r="3.4" fill="var(--accent)"/>' +
  '<text class="lbl" x="107" y="82" text-anchor="middle" style="font-size:6px">선 또는 점</text>' +
  /* 면 */
  '<text class="lbl acc" x="180" y="12" text-anchor="middle" style="font-size:7px">면의 투상</text>' +
  '<rect class="ln ln-thin" x="156" y="20" width="48" height="48"/>' +
  '<rect class="face-f" x="164" y="28" width="24" height="18"/>' +
  '<line class="ln ln-outline" x1="164" y1="58" x2="196" y2="58"/>' +
  '<text class="lbl" x="180" y="82" text-anchor="middle" style="font-size:6px">면 또는 선</text>' +
  '<text class="lbl" x="107" y="93" text-anchor="middle" style="font-size:6px">투상면과 평행하면 실제 길이 · 실제 넓이로 나타난다</text>');

/* ④ 몇 면도로 그릴까 — 1면도 · 2면도 · 3면도 (교과서 98쪽) */
NEW.howmany = S(220, 104,
  /* 1면도 */
  '<text class="lbl acc" x="34" y="12" text-anchor="middle" style="font-size:7px">1면도</text>' +
  '<circle class="ln ln-outline" cx="34" cy="42" r="19"/>' +
  '<line class="ln ln-center" x1="10" y1="42" x2="58" y2="42"/>' +
  '<line class="ln ln-center" x1="34" y1="18" x2="34" y2="66"/>' +
  '<text class="lbl" x="34" y="80" text-anchor="middle" style="font-size:6.5px">Ø30</text>' +
  '<text class="lbl" x="34" y="92" text-anchor="middle" style="font-size:6px">치수 보조 기호로</text>' +
  '<text class="lbl" x="34" y="100" text-anchor="middle" style="font-size:6px">한 장이면 끝</text>' +
  /* 2면도 */
  '<text class="lbl acc" x="110" y="12" text-anchor="middle" style="font-size:7px">2면도</text>' +
  '<rect class="ln ln-outline" x="90" y="20" width="40" height="16"/>' +
  '<rect class="ln ln-outline" x="90" y="44" width="40" height="24"/>' +
  '<line class="ln ln-center" x1="110" y1="16" x2="110" y2="72"/>' +
  '<text class="lbl" x="110" y="92" text-anchor="middle" style="font-size:6px">정면도 + 한 장이면</text>' +
  '<text class="lbl" x="110" y="100" text-anchor="middle" style="font-size:6px">충분할 때</text>' +
  /* 3면도 */
  '<text class="lbl acc" x="184" y="12" text-anchor="middle" style="font-size:7px">3면도</text>' +
  '<rect class="ln ln-outline" x="160" y="20" width="34" height="14"/>' +
  '<rect class="ln ln-outline" x="160" y="42" width="34" height="26"/>' +
  '<rect class="ln ln-outline" x="200" y="42" width="18" height="26"/>' +
  '<line class="ln ln-center" x1="177" y1="16" x2="177" y2="72"/>' +
  '<text class="lbl" x="188" y="92" text-anchor="middle" style="font-size:6px">모양이 복잡할 때</text>');

/* ⑤ 가공 방향에 맞춘 배치 — 선반(원통 절삭) · 밀링(평면 절삭) (교과서 99쪽) */
NEW.machining = S(220, 92,
  '<text class="lbl acc" x="54" y="12" text-anchor="middle" style="font-size:7px">원통 절삭 (선반)</text>' +
  '<rect class="ln ln-outline" x="16" y="30" width="76" height="24"/>' +
  '<line class="ln ln-center" x1="10" y1="42" x2="98" y2="42"/>' +
  '<path d="M104 42 L118 36 L118 48 Z" fill="var(--accent)"/>' +
  '<text class="lbl" x="54" y="70" text-anchor="middle" style="font-size:6px">중심선을 수평으로</text>' +
  '<text class="lbl" x="54" y="80" text-anchor="middle" style="font-size:6px">공구는 우 → 좌</text>' +
  '<text class="lbl acc" x="170" y="12" text-anchor="middle" style="font-size:7px">평면 절삭 (밀링)</text>' +
  '<rect class="ln ln-outline" x="136" y="34" width="72" height="20"/>' +
  '<line class="ln ln-outline" x1="136" y1="34" x2="208" y2="34" stroke="var(--accent)" stroke-width="3.4"/>' +
  '<text class="lbl" x="170" y="70" text-anchor="middle" style="font-size:6px">길이 방향으로 눕히고</text>' +
  '<text class="lbl" x="170" y="80" text-anchor="middle" style="font-size:6px">가공면이 보이게</text>');

/* ══════════ 그림 등록 — fig:'키' 로 부른다 ══════════ */
var FIGS = {
  ortho:   function () { return one(T('projFig', ['ortho'])); },
  iso:     function () { return one(T('projFig', ['iso'])); },
  oblique: function () { return one(T('projFig', ['oblique'])); },
  persp:   function () { return one(T('projFig', ['persp'])); },
  four:    function () { return one(T('figTusangSummary')); },
  glass:   function () { return one(T('figGlassBox')); },
  third:   function () { return one(T('layout3rd')); },
  first:   function () { return one(T('layout1st')); },
  both:    function () { return two(T('layout3rd'), '제3각법 (KS · 우리가 쓰는 것)',
                                    T('layout1st'), '제1각법 (유럽)'); },
  six:     function () { return one(T('fig6View')); },
  mark:    function () { return one(T('figAngleMark')); },
  pick:    function () { return one(T('figViewPick')); },
  align:   function () { return one(T('figAlign')); },
  place:   function () { return one(T('figPlaceLong')); },
  ray:     function () { return one(NEW.ray); },
  quad:    function () { return one(NEW.quad); },
  pls:     function () { return one(NEW.pls); },
  howmany: function () { return one(NEW.howmany); },
  mach:    function () { return one(NEW.machining); },
  /* 도구가 가진 입체·투상도 그림 두 개를 나란히 (원기둥 예) */
  cyl:     function () {
    var F = window.TFIG || {};
    if (!F.svgWrap || !F.SOLID_MAP || !F.VIEW) return '';
    var s = F.SOLID_MAP['cyl'];
    return two(F.svgWrap(s.iso, s.isoVB), '세워 둔 원기둥',
               F.svgWrap(F.VIEW['circle'].svg), '위에서 보면 = 평면도');
  },
  hidden:  function () {
    var F = window.TFIG || {};
    if (!F.svgWrap || !F.VIEW) return '';
    return two(F.svgWrap(F.VIEW['rect'].svg), '보이는 모서리 — 굵은 실선',
               F.svgWrap(F.VIEW['rectDash'].svg), '안 보이는 모서리 — 파선');
  }
};

/* ══════════ 슬라이드 원고 ══════════
   한 장 = 한 화면. 요점은 3~5줄. {{ }} 는 눌러야 열리는 빈칸(한 장에 2~3개).
   발문에는 정답을 쓰지 않는다 — 정답은 퀴즈 해설에만 있다. */
var LESSON = [

/* ───────── 1. 정투상도 ───────── */
{ u:'1. 정투상도', t:'왜 여러 방향에서 그릴까', fig:'ortho', cap:'정투상법으로 그린 3면도',
  pts:['우리가 만드는 물건은 <b>3차원</b>인데, 도면 종이는 <b>2차원</b>이다.',
       '그래서 <b>앞 · 위 · 옆</b> 여러 방향에서 본 모습을 각각 그린다.',
       '이렇게 그린 그림이 {{투상도}}, 기계 도면은 대부분 {{정투상법}}으로 그린다.'],
  ask:'물건을 사진 한 장으로만 보여 주면 만드는 사람은 무엇을 알 수 없을까?',
  ansq:'기계 도면에 주로 쓰는 투상법은?',
  anso:['정투상법','등각투상법','사투상법','투시투상법'], ansa:0,
  anse:'<b>정투상법</b>. 각 방향에서 수직으로 본 모습이라 실제 치수가 그대로 남는다.' },

{ u:'1. 정투상도', t:'정투상도의 원리', fig:'ray', cap:'교과서 91쪽 — 투상선의 차이',
  pts:['물체를 <b>유리 상자</b> 안에 넣었다고 생각한다.',
       '각 꼭짓점이 유리면에 <b>직각으로</b> 투과되는 점을 이으면 투상도가 된다.',
       '이때 시선인 {{투상선}}이 유리면인 {{투상면}}에 <b>직각이면서 서로 평행</b>하다.',
       '투시 투상은 투상선이 <b>한 점으로 모인다</b> — 그래서 원근이 생긴다.'],
  ask:'투상선이 서로 평행하면 그려진 크기는 실제 크기와 어떤 관계가 될까?',
  ansq:'정투상도의 투상선은 투상면에 대해 어떠한가?',
  anso:['한 점으로 모인다','직각이면서 서로 평행하다','45°로 기울어져 있다','제각각이다'], ansa:1,
  anse:'직각 + 평행이라 <b>실제 치수 그대로</b> 투상된다. 한 점으로 모이는 것은 투시 투상이다.' },

{ u:'1. 정투상도', t:'기본 투상면 — 입화면 · 평화면 · 측화면', fig:'glass', cap:'세 방향에서 본다',
  pts:['수직으로 놓인 유리면이 {{입화면}} — 앞에서 본 <b>정면도</b>가 생긴다.',
       '수평으로 놓인 유리면이 {{평화면}} — 위에서 본 <b>평면도</b>가 생긴다.',
       '나머지 하나가 {{측화면}} — 옆에서 본 <b>좌(우)측면도</b>가 생긴다.',
       '이 세 평면을 <b>정투상도의 기본 투상면</b>이라고 한다.'],
  ask:'정면도는 세 투상면 가운데 어느 면에 그려질까?',
  ansq:'평면도가 그려지는 투상면의 이름은?',
  anso:['입화면','평화면','측화면','배화면'], ansa:1,
  anse:'수평으로 놓인 <b>평화면</b>이다. 위에서 본 모양이 여기에 맺힌다.' },

{ u:'1. 정투상도', t:'투상면을 펼치면 3면도', fig:'third', cap:'제3각법으로 펼친 배치',
  pts:['세 면에 그림을 그린 뒤 상자를 <b>펼치면</b> 종이 한 장이 된다.',
       '펼친 그림이 바로 도면에서 보는 <b>3면도</b>다.',
       '정면도를 가운데 두고 평면도는 <b>위</b>, 우측면도는 <b>오른쪽</b>에 온다.'],
  ask:'상자를 펼친다고 할 때, 위쪽 유리면은 어느 쪽으로 젖혀질까?',
  ansq:'제3각법에서 우측면도는 정면도의 어디에 그리는가?',
  anso:['왼쪽','오른쪽','위','아래'], ansa:1,
  anse:'오른쪽에서 봤으니 <b>오른쪽</b>에 그린다 — 본 방향 그대로다.' },

{ u:'1. 정투상도', t:'기본 6면도', fig:'six', cap:'상자의 여섯 면 = 여섯 개의 투상도',
  pts:['유리 상자의 면은 여섯이니 투상도도 원래 <b>여섯 개</b>다.',
       '정면도 · 평면도 · 우측면도 · <b>좌측면도</b> · <b>저면도</b> · <b>배면도</b>.',
       '상 · 하 · 전 · 후 · 좌 · 우에서 보고 펼친 것이 {{기본 6면도}}다.',
       '실제 도면은 이 가운데 <b>꼭 필요한 것만</b> 골라 그린다.'],
  ask:'여섯 개를 모두 그리면 도면을 읽는 사람에게 무엇이 불편할까?',
  ansq:'아래에서 본 투상도의 이름은?',
  anso:['배면도','저면도','좌측면도','평면도'], ansa:1,
  anse:'아래에서 본 것이 <b>저면도</b>, 뒤에서 본 것이 배면도다.' },

/* ───────── 2. 투상각에 따른 정투상법 ───────── */
{ u:'2. 투상각에 따른 정투상법', t:'투상각이란', fig:'quad', cap:'교과서 93쪽 — 네 개의 투상각',
  pts:['수평면과 수직면을 <b>서로 수직으로</b> 교차시키면 공간이 <b>4개</b>로 나뉜다.',
       '이 각들을 {{투상각}}이라고 한다.',
       '물체를 <b>어느 각에 놓고</b> 투상했느냐에 따라 {{제3각법}}과 제1각법으로 나뉜다.'],
  ask:'같은 물체인데 놓는 자리가 달라지면 그림의 무엇이 달라질까?',
  ansq:'투상각은 모두 몇 개인가?',
  anso:['2개','3개','4개','6개'], ansa:2,
  anse:'수평면과 수직면이 만나 <b>4개</b>가 생긴다. 그 가운데 1각과 3각을 쓴다.' },

{ u:'2. 투상각에 따른 정투상법', t:'제3각법 — 눈 · 투상면 · 물체', fig:'third', cap:'제3각법의 배치',
  pts:['물체를 제3면각에 놓으면 <b>눈 → 투상면 → 물체</b> 순서가 된다.',
       '본 쪽의 투상면에 그대로 그려지므로 <b>본 방향 그대로</b> 배치된다.',
       '투상도끼리 비교·대조가 쉽고 <b>치수 기입이 편리</b>하다.',
       '한국 산업 표준({{KS}})은 제3각법을 <b>원칙</b>으로 한다.'],
  ask:'"본 방향 그대로"라는 말을 평면도로 설명해 보자.',
  ansq:'KS 에서 도면 작성의 원칙으로 정한 투상법은?',
  anso:['제1각법','제2각법','제3각법','제4각법'], ansa:2,
  anse:'KS 는 <b>제3각법</b>을 원칙으로 한다. 미국도 같고, 유럽은 제1각법을 쓴다.' },

{ u:'2. 투상각에 따른 정투상법', t:'점 · 선 · 면은 어떻게 투상될까', fig:'pls', cap:'교과서 94~95쪽',
  pts:['<b>점</b>은 세 투상면에 모두 <b>점</b>으로 나타난다.',
       '<b>선</b>은 투상면과 평행하면 {{실제 길이}}로, 평행하지 않으면 <b>축소되어</b> 나타난다.',
       '투상면에 수직인 선은 <b>점</b>으로 보인다.',
       '<b>면</b>은 투상면과 평행하면 실제 넓이로, 수직이면 <b>선</b>으로 나타난다.'],
  ask:'도면에서 길이를 잴 때 어느 투상도의 치수를 믿어야 할까?',
  ansq:'투상면에 <b>수직</b>으로 놓인 선은 그 투상면에 어떻게 나타나는가?',
  anso:['실제 길이의 선','점','축소된 선','나타나지 않는다'], ansa:1,
  anse:'끝에서 바라보는 셈이라 <b>점</b>으로 찍힌다. 평행할 때만 실제 길이가 나온다.' },

{ u:'2. 투상각에 따른 정투상법', t:'제1각법은 배치가 반대', fig:'both', cap:'같은 물체, 다른 배치',
  pts:['제1각법은 물체를 제1면각에 놓아 <b>눈 → 물체 → 투상면</b> 순서가 된다.',
       '그래서 상·하·좌·우에서 본 그림이 정면도를 기준으로 {{반대}} 쪽에 배치된다.',
       '평면도가 <b>아래</b>, 우측면도가 <b>왼쪽</b>으로 간다.',
       '위치 관계가 어긋나 <b>비교·대조가 어렵다</b>.'],
  ask:'배치만 다르고 그림 자체는 같을까, 다를까?',
  ansq:'제1각법에서 평면도는 정면도의 어디에 그리는가?',
  anso:['위','아래','왼쪽','오른쪽'], ansa:1,
  anse:'제1각법은 반대로 간다 — 평면도는 <b>아래</b>, 우측면도는 왼쪽이다.' },

{ u:'2. 투상각에 따른 정투상법', t:'각법의 표시법', fig:'mark', cap:'각법 기호와 표제란',
  pts:['도면을 받으면 <b>표제란의 「투상」 칸</b>을 본다.',
       '문자로 「제3각법」이라 적거나 {{각법 기호}}(원뿔대 그림)로 표시한다.',
       '기호는 원뿔대를 본 그림이다 — <b>제3각법은 동심원이 왼쪽</b>에 온다.',
       '한 도면 안에서 제1각법과 제3각법을 <b>섞어 쓸 수 없다</b>.'],
  ask:'표제란에 각법 표시가 아예 없다면 어느 쪽으로 읽는 것이 안전할까?',
  ansq:'각법을 표시하는 곳으로 <b>원칙</b>인 자리는?',
  anso:['도면 왼쪽 위 여백','표제란의 「투상」 칸','부품란','도면 뒷면'], ansa:1,
  anse:'원칙은 <b>표제란의 「투상」 칸</b>이다. 투상도 부근에 함께 표시하기도 한다.' },

/* ───────── 3. 투상도의 선정과 배치 ───────── */
{ u:'3. 투상도의 선정과 배치', t:'정면도부터 고른다', fig:'ortho', cap:'가운데가 정면도',
  pts:['투상도 선정은 <b>정면도를 기준</b>으로 한다.',
       '물체의 <b>모양과 특징이 가장 잘 나타나는 면</b>을 정면도로 고른다.',
       '자동차라면 <b>측면</b>이 그 면이다 — 앞에서 본 모습으로는 차종을 알기 어렵다.',
       '좋은 투상은 <b>가능한 한 적은 수</b>의 투상도로 나타낸 것이다.'],
  ask:'우리 교실의 의자를 그린다면 어느 면을 정면도로 삼겠는가?',
  ansq:'정면도를 고르는 기준으로 옳은 것은?',
  anso:['가장 넓은 면','모양과 특징이 가장 잘 나타나는 면','가장 좁은 면','언제나 앞면'], ansa:1,
  anse:'물체의 <b>모양과 특징이 가장 잘 드러나는 면</b>이다. 앞면이라고 정해져 있지 않다.' },

{ u:'3. 투상도의 선정과 배치', t:'숨은선이 적은 쪽을 고른다', fig:'pick', cap:'교과서 97쪽 그림 Ⅲ-13',
  pts:['정면도를 정한 뒤 나머지는 {{숨은선}}이 적은 투상도를 고른다.',
       '숨은선 수가 <b>같다면</b> 저면도보다 <b>평면도</b>를 고른다.',
       '역시 같다면 좌측면도보다 <b>우측면도</b>를 고르는 것이 원칙이다.',
       '평면도와 저면도의 조건이 같으면 <b>저면도를 생략</b>한다.'],
  ask:'숨은선이 많은 투상도를 그리면 도면이 어떻게 보일까?',
  ansq:'숨은선 수가 같을 때 고르는 것은?',
  anso:['저면도','평면도','배면도','아무것이나'], ansa:1,
  anse:'저면도보다 <b>평면도</b>, 좌측면도보다 우측면도가 원칙이다.' },

{ u:'3. 투상도의 선정과 배치', t:'몇 면도로 그릴까', fig:'howmany', cap:'1면도 · 2면도 · 3면도',
  pts:['원기둥·각기둥처럼 단면이 일정하거나 얇은 판은 <b>치수 보조 기호</b>로 {{1면도}}만 그린다.',
       '보조 기호는 <b>Ø</b>(지름) · <b>□</b>(정사각형) · <b>t</b>(두께)를 쓴다.',
       '정면도 외에 한 장만 더 있으면 충분할 때는 <b>2면도</b>로 투상한다.',
       '모양이 다소 복잡하면 {{3면도}}로 나타낸다.'],
  ask:'Ø30 이라고만 적힌 한 장의 그림으로 어떻게 원기둥임을 알 수 있을까?',
  ansq:'두께가 일정한 얇은 판을 1면도로 나타낼 때 쓰는 치수 보조 기호는?',
  anso:['Ø','□','t','R'], ansa:2,
  anse:'두께는 <b>t</b> 로 적는다(t=2). Ø 는 지름, □ 는 정사각형이다.' },

{ u:'3. 투상도의 선정과 배치', t:'세 그림은 선이 맞아 있다', fig:'align', cap:'너비와 높이를 나눠 가진다',
  pts:['<b>너비</b>는 정면도와 평면도가 {{같다}} — 위아래로 선이 맞는다.',
       '<b>높이</b>는 정면도와 우측면도가 <b>같다</b> — 좌우로 선이 맞는다.',
       '평면도의 세로와 우측면도의 가로는 둘 다 물체의 <b>깊이</b>다.',
       '그래서 세 그림은 <b>선을 맞춰</b> 나란히 그린다.'],
  ask:'평면도의 가로 길이가 정면도와 다르게 그려졌다면 무엇을 의심해야 할까?',
  ansq:'정면도와 <b>높이</b>가 같아야 하는 투상도는?',
  anso:['평면도','우측면도','저면도','배면도'], ansa:1,
  anse:'높이는 정면도 = <b>우측면도</b>, 너비는 정면도 = 평면도다.' },

{ u:'3. 투상도의 선정과 배치', t:'안 보이는 모서리는 숨은선', fig:'hidden', cap:'외형선과 숨은선',
  pts:['그 방향에서 <b>보이는</b> 모서리는 굵은 실선인 {{외형선}}으로 그린다.',
       '<b>보이지 않는</b> 모서리는 파선인 {{숨은선}}으로 그린다.',
       '구멍이나 속이 빈 부분이 숨은선으로 나타나는 대표적인 경우다.'],
  ask:'숨은선이 너무 많아 도면이 지저분해지면 어떤 방법을 쓸 수 있을까?',
  ansq:'숨은선을 그릴 때 쓰는 선은?',
  anso:['굵은 실선','파선','1점 쇄선','2점 쇄선'], ansa:1,
  anse:'숨은선은 <b>파선</b>이다. 굵은 실선은 외형선, 1점 쇄선은 중심선이다.' },

{ u:'3. 투상도의 선정과 배치', t:'어떻게 놓고 그릴까', fig:'place', cap:'긴 물체는 눕혀서',
  pts:['물체는 가능한 한 <b>자연 상태에서 사용할 때의 위치</b>로 놓고 투상한다.',
       '길이가 긴 물체는 <b>길이 방향</b>으로 안정되게 눕혀 놓는다.',
       '림 · 벨트 풀리 · 기어 같은 {{원형 물체}}는 원형으로 보이는 쪽을 정면도로 <b>쓰지 않는다</b>.'],
  ask:'기어를 동그랗게 보이는 쪽으로 정면도를 잡으면 무엇을 알 수 없게 될까?',
  ansq:'벨트 풀리의 정면도로 알맞은 것은?',
  anso:['원으로 보이는 쪽','축 방향에서 옆으로 본 쪽','아래에서 본 쪽','어느 쪽이든 무방'], ansa:1,
  anse:'원형 물체는 특별한 경우를 빼면 원형으로 보이는 쪽을 정면도로 삼지 않는다 — <b>옆에서 본 쪽</b>이라야 두께·홈이 보인다.' },

{ u:'3. 투상도의 선정과 배치', t:'가공 방향에 맞춘 배치', fig:'mach', cap:'교과서 99쪽 — 선반과 밀링',
  pts:['<b>원통 절삭</b>(선반) 가공품은 중심선을 {{수평}}으로 놓는다.',
       '절삭 공구가 <b>우측에서 좌측</b>으로 움직이므로 가공 방향과 같게 놓는다.',
       '<b>평면 절삭</b>(밀링) 가공품은 길이 방향으로 놓고 <b>가공면이 보이도록</b> 그린다.',
       '도면을 보는 사람이 <b>만드는 자세 그대로</b> 읽게 하려는 것이다.'],
  ask:'가공하는 사람이 도면을 머릿속에서 돌려 봐야 한다면 어떤 일이 생길까?',
  ansq:'선반 가공품을 투상할 때 중심선을 어떻게 놓는가?',
  anso:['수직','수평','45° 경사','상관없다'], ansa:1,
  anse:'중심선을 <b>수평</b>으로 두고 공구가 움직이는 방향(우→좌)과 같게 놓는다.' },

/* ───────── 4. 특수 투상도 맛보기 ───────── */
{ u:'4. 특수 투상도 맛보기', t:'평면 도형이냐, 입체도냐', fig:'four', cap:'투상법 네 가지',
  pts:['<b>정투상도</b>는 평면에 <b>평면 도형</b>으로 투상하는 방법이다.',
       '{{특수 투상도}}는 평면에 <b>입체도</b>로 투상하는 방법이다.',
       '특수 투상도에는 <b>축측 투상도 · 사투상도 · 투시 투상도</b>가 있다.',
       '특수 투상도를 그릴 때는 숨은선을 <b>그리지 않는 것</b>이 좋다.'],
  ask:'조립 설명서 그림은 둘 중 어느 쪽에 가까울까? 왜 그럴까?',
  ansq:'물체의 모양을 하나의 <b>입체도</b>로 나타내는 방법을 무엇이라 하는가?',
  anso:['정투상도','특수 투상도','전개도','단면도'], ansa:1,
  anse:'<b>특수 투상도</b>다. 축측 투상도 · 사투상도 · 투시 투상도로 나뉜다.' },

{ u:'4. 특수 투상도 맛보기', t:'등각 투상도', fig:'iso', cap:'세 축이 120°',
  pts:['<b>축측 투상도</b>의 하나로, 물체의 밑면 경사가 지면과 <b>30°</b>가 되게 잡는다.',
       '세 모서리가 {{120}}°의 등각을 이루어 <b>세 면이 동시에</b> 보인다.',
       '세 축의 길이 비율은 <b>1 : 1 : 1</b>이다.',
       '평행투상이라 <b>소실점이 없다</b>.'],
  ask:'세 면이 한 그림에 보이면 무엇이 편해질까?',
  ansq:'등각 투상도에서 세 축이 이루는 각은?',
  anso:['90°','105°','120°','135°'], ansa:2,
  anse:'세 축이 서로 <b>120°</b>씩이다. 밑면 경사는 지면과 30°.' },

{ u:'4. 특수 투상도 맛보기', t:'사투상도', fig:'oblique', cap:'정면은 실제 모양 그대로',
  pts:['<b>정면</b>은 정투상도의 정면도와 {{같은 크기}}로 그린다.',
       '윗면과 옆면만 수평선과 <b>30° · 45° · 60°</b> 로 기울여 그린다.',
       '경사면의 길이는 정면 길이의 <b>1 · 3/4 · 1/2</b> 비율로 그린다.',
       '경사각 45°에 길이를 1/2 로 줄인 것을 {{캐비닛도}}라고 한다.'],
  ask:'정면을 실제 모양대로 두면 어떤 물체를 그릴 때 편할까?',
  ansq:'캐비닛도의 조건으로 옳은 것은?',
  anso:['경사각 30° · 깊이 1배','경사각 45° · 깊이 1/2','경사각 60° · 깊이 3/4','경사각 45° · 깊이 1배'], ansa:1,
  anse:'경사각 <b>45°</b>, 깊이 <b>1/2</b>. 정육면체를 그렸을 때 가장 자연스럽게 보이는 조건이다.' },

{ u:'4. 특수 투상도 맛보기', t:'투시 투상도', fig:'persp', cap:'멀수록 작아진다',
  pts:['시점에서 물체를 본 시선이 화면과 만나는 점을 이어 <b>원근감</b>이 나게 그린다.',
       '물체의 각 점이 수평선 위에 모이는 점을 {{소점}}(소실점)이라고 한다.',
       '소점 수에 따라 <b>1점 · 2점 · 3점</b> 투시 투상도로 나뉜다.',
       '<b>건축 · 토목 · 교량</b>을 그릴 때 많이 쓴다.'],
  ask:'왜 투시 투상도로 그린 그림만 보고는 부품을 만들 수 없을까?',
  ansq:'투시 투상도를 기계 부품 도면에 쓰지 않는 까닭은?',
  anso:['그리기 어려워서','실제 치수와 달라져서','색이 없어서','종이가 커져서'], ansa:1,
  anse:'멀수록 작아져 <b>실제 치수와 달라지기</b> 때문이다. 그래서 제작 도면은 정투상도로 그린다.' },

{ u:'4. 특수 투상도 맛보기', t:'오늘 정리', fig:'four', cap:'정투상 · 등각 · 사투상 · 투시',
  pts:['투상도 = 3차원 물체를 <b>여러 방향에서 본</b> 2차원 그림.',
       '기본 투상면은 <b>입화면 · 평화면 · 측화면</b>, 펼치면 3면도가 된다.',
       '{{제3각법}} = 본 방향 그대로. 평면도는 위, 우측면도는 오른쪽. KS 원칙.',
       '투상도는 <b>숨은선이 적은 쪽</b>으로, 가능한 한 <b>적은 수</b>로 고른다.',
       '특수 투상도 = 평면에 <b>입체도</b>로 — 축측 · 사투상 · 투시.'],
  ask:'이제 직접 풀어 볼까? (나가기 → 모드 1~3 또는 종합 점검)' }
];

window.LESSON  = LESSON;
window.LESSFIG = FIGS;
})();
