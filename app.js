(function () {
  'use strict';

  var data = window.SCORECARD;
  if (!data) return;

  // 小工具：建立元素，文字一律用 textContent，避免把資料當成 HTML 執行
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }
  function byId(id) { return document.getElementById(id); }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  var tagColors = {
    good: ['var(--good-soft)', 'var(--good)'],
    warn: ['var(--warn-soft)', 'var(--warn)'],
    bad: ['var(--bad-soft)', 'var(--bad)']
  };

  function render(siteId) {
    var s = data.sites[siteId];
    if (!s) return;

    document.title = '網站成績單｜' + s.name;
    byId('site-name').textContent = s.name;
    byId('period').textContent = data.period;
    byId('updated').textContent = '資料最新到 ' + data.updated;
    byId('demo-banner').hidden = !data.isDemo;

    // 健康分數
    var sc = s.score;
    byId('score-num').textContent = sc.total;
    var st = byId('score-status');
    st.textContent = sc.statusLabel;
    st.className = 'status ' + sc.status;
    var d = byId('score-delta');
    d.textContent = (sc.delta >= 0 ? '▲ 比上月 +' : '▼ 比上月 ') + sc.delta + ' 分';
    d.className = 'delta ' + (sc.delta >= 0 ? 'up' : 'down');
    byId('score-summary').textContent = sc.summary;

    var parts = byId('score-parts');
    clear(parts);
    sc.parts.forEach(function (p) {
      var row = el('div', 'part');
      row.appendChild(el('span', null, p.name));
      var track = el('div', 'part-track');
      var fill = el('div', 'part-fill ' + p.status);
      fill.style.width = Math.round((p.score / p.max) * 100) + '%';
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el('span', null, p.score + ' / ' + p.max));
      parts.appendChild(row);
    });

    // 四個重點
    var kpis = byId('kpis');
    clear(kpis);
    s.kpis.forEach(function (k) {
      var card = el('article', 'card kpi');
      card.appendChild(el('h3', null, k.question));
      var v = el('p', 'kpi-value');
      v.appendChild(el('strong', null, k.value));
      v.appendChild(el('span', null, k.unit));
      card.appendChild(v);
      card.appendChild(el('p', 'delta ' + k.trend, k.delta));
      card.appendChild(el('p', 'compare', k.compare));
      card.appendChild(el('p', 'verdict', k.verdict));
      card.appendChild(el('p', 'source', k.source));
      kpis.appendChild(card);
    });

    // 三件待辦
    var todos = byId('todos');
    clear(todos);
    s.todos.forEach(function (t, i) {
      var li = el('li', 'card todo');
      li.appendChild(el('div', 'todo-num', String(i + 1)));
      var body = el('div', 'todo-body');
      var head = el('div', 'todo-head');
      head.appendChild(el('h3', null, t.title));
      var tag = el('span', 'tag', t.tag);
      var c = tagColors[t.tagStatus] || tagColors.warn;
      tag.style.background = c[0];
      tag.style.color = c[1];
      head.appendChild(tag);
      body.appendChild(head);
      var dl = el('dl');
      [['發現', t.found, ''], ['為什麼重要', t.why, ''], ['怎麼做', t.how, 'how']].forEach(function (r) {
        dl.appendChild(el('dt', null, r[0]));
        dl.appendChild(el('dd', r[2], r[1]));
      });
      body.appendChild(dl);
      body.appendChild(el('p', 'source', '判斷規則：' + t.rule));
      li.appendChild(body);
      todos.appendChild(li);
    });

    // 趨勢圖
    var tr = s.trend;
    var max = Math.max.apply(null, tr.weeks.map(function (w) { return w[1]; }));
    var chart = byId('trend');
    var labels = byId('trend-labels');
    clear(chart);
    clear(labels);
    tr.weeks.forEach(function (w, i) {
      var col = el('div', 'bar-col');
      col.appendChild(el('span', null, w[1].toLocaleString('en-US')));
      var bar = el('div', 'bar' + (i >= tr.launchIndex ? ' after' : ''));
      bar.style.height = Math.round((w[1] / max) * 190) + 'px';
      col.appendChild(bar);
      chart.appendChild(col);

      var lab = el('div', null, w[0]);
      if (i === tr.launchIndex) lab.appendChild(el('span', 'launch', '改版上線'));
      labels.appendChild(lab);
    });
    var first = tr.weeks[0], last = tr.weeks[tr.weeks.length - 1];
    chart.setAttribute('aria-label', '近 12 週校外訪客長條圖，從 ' + first[0] + ' 週的 ' +
      first[1] + ' 位到 ' + last[0] + ' 週的 ' + last[1] + ' 位');
    byId('trend-note').textContent = tr.note;
  }

  // 網站選單
  var select = byId('site-select');
  Object.keys(data.sites).forEach(function (id) {
    var opt = el('option', null, data.sites[id].name);
    opt.value = id;
    select.appendChild(opt);
  });
  var fromUrl = new URLSearchParams(location.search).get('site');
  var initial = data.sites[fromUrl] ? fromUrl : select.options[0].value;
  select.value = initial;
  select.addEventListener('change', function () {
    var url = new URL(location.href);
    url.searchParams.set('site', select.value);
    history.replaceState(null, '', url);
    render(select.value);
  });

  // 資料來源開關
  var toggle = byId('show-sources');
  toggle.addEventListener('change', function () {
    document.body.classList.toggle('show-sources', toggle.checked);
  });

  render(initial);
})();
