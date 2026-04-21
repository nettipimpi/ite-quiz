let curSess = null;
let qIds = [];
let curQ = 0;
let heardV = null;
let ratingV = null;
let saving = false;

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function selectSess(s) {
  curSess = s;
  const info = SESS_INFO[s];
  document.querySelectorAll('.ss').forEach((b, i) => {
    b.className = 'ss' + (i + 1 === s ? ` sel-s${s}` : '');
  });
  const det = document.getElementById('sess-detail');
  det.style.display = 'block';
  document.getElementById('sess-desc').textContent = info.desc;
}

function startQuiz() {
  if (!curSess) return;
  qIds = shuffle(SESSION_IDS[curSess]);
  curQ = 0;
  showQ();
  show('s-quiz');
}

function showQ() {
  const id = qIds[curQ];
  const q = STMTS[id];
  const info = SESS_INFO[curSess];
  const pct = (curQ / qIds.length * 100).toFixed(0);

  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-fill').style.background = info.color;
  document.getElementById('q-counter').textContent = (curQ + 1) + ' / ' + qIds.length;
  document.getElementById('q-badge').textContent = info.label;
  document.getElementById('q-badge').className = 'badge ' + info.cls;
  document.getElementById('q-text').textContent = q.text;
  document.getElementById('q-err').textContent = '';

  heardV = null;
  ratingV = null;

  document.querySelectorAll('.hb').forEach(b => b.classList.remove('sel'));

  const rr = document.getElementById('rating-row');
  rr.innerHTML = '';
  for (let i = 1; i <= 7; i++) {
    const b = document.createElement('button');
    b.className = 'rb';
    b.textContent = i;
    b.onclick = () => setRating(i);
    rr.appendChild(b);
  }

  document.getElementById('next-btn').disabled = true;
}

function setHeard(v) {
  heardV = v;
  document.querySelectorAll('.hb').forEach((b, i) => b.classList.toggle('sel', i === v));
  checkReady();
}

function setRating(v) {
  ratingV = v;
  document.querySelectorAll('.rb').forEach((b, i) => b.classList.toggle('sel', i === v - 1));
  checkReady();
}

function checkReady() {
  document.getElementById('next-btn').disabled = (heardV === null || ratingV === null);
}

async function nextQ() {
  if (saving) return;
  const id = qIds[curQ];
  const q = STMTS[id];

  saving = true;
  document.getElementById('next-btn').disabled = true;
  document.getElementById('next-btn').textContent = 'Salvataggio...';

  const { error } = await supabase.from('risposte').insert({
    sessione: curSess,
    stmt_id: id,
    stmt_text: q.text,
    vero: q.vero,
    esposizione: getEsposizione(id, curSess),
    heard: heardV,
    rating: ratingV,
  });

  saving = false;

  if (error) {
    document.getElementById('q-err').textContent = 'Errore di rete, riprova.';
    document.getElementById('next-btn').disabled = false;
    document.getElementById('next-btn').textContent = 'Avanti →';
    return;
  }

  curQ++;
  if (curQ >= qIds.length) {
    document.getElementById('done-next').textContent = SESS_INFO[curSess].next;
    show('s-done');
  } else {
    document.getElementById('next-btn').textContent = 'Avanti →';
    showQ();
  }
}
