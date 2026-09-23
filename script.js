// ============================================================
// Unidad 7 — Apunte interactivo. Vanilla JS, sin dependencias.
// ============================================================

// ---------- Multiple choice quizzes ----------
document.querySelectorAll('.mcq').forEach((mcq) => {
  const correct = mcq.dataset.correct;
  const buttons = mcq.querySelectorAll('.mcq-opts button');
  const explain = mcq.querySelector('.mcq-explain');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.value === correct;
      buttons.forEach((b) => (b.disabled = true));
      btn.classList.add(isCorrect ? 'correct' : 'incorrect');
      if (!isCorrect) {
        const correctBtn = mcq.querySelector(`[data-value="${correct}"]`);
        if (correctBtn) correctBtn.classList.add('correct');
      }
      explain.textContent = isCorrect
        ? '✓ Correcto.'
        : '✗ No es esa — mirá la opción marcada en verde.';
      explain.style.color = isCorrect ? 'var(--good)' : 'var(--bad)';
    });
  });
});

// ---------- TDA match quiz ----------
const matchTda = document.getElementById('matchTda');
if (matchTda) {
  const rows = matchTda.querySelectorAll('.match-row');
  const feedback = document.getElementById('feedbackTda');
  let solvedCount = 0;

  rows.forEach((row) => {
    const answer = row.dataset.answer;
    const buttons = row.querySelectorAll('.match-options button');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (row.classList.contains('solved')) return;
        const isCorrect = btn.dataset.value === answer;
        buttons.forEach((b) => (b.disabled = true));
        btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        if (!isCorrect) {
          const correctBtn = row.querySelector(`[data-value="${answer}"]`);
          if (correctBtn) correctBtn.classList.add('correct');
        }
        row.classList.add('solved');
        solvedCount++;
        if (solvedCount === rows.length) {
          feedback.textContent = '✓ Las cuatro resueltas — así se piensa en TDA: por comportamiento, no por nombre.';
        }
      });
    });
  });
}

// ---------- Decision tool ----------
const decideTool = document.querySelector('.decide-tool');
if (decideTool) {
  const steps = decideTool.querySelectorAll('.decide-step');
  const results = decideTool.querySelectorAll('.decide-result');
  const resetBtn = document.getElementById('decideReset');

  function showOnly(selector) {
    steps.forEach((s) => (s.hidden = true));
    results.forEach((r) => (r.hidden = true));
    const target = decideTool.querySelector(`[data-step="${selector}"], [data-result="${selector}"]`);
    if (target) target.hidden = false;
    resetBtn.hidden = !decideTool.querySelector('.decide-result:not([hidden])');
  }

  decideTool.querySelectorAll('.decide-btn').forEach((btn) => {
    btn.addEventListener('click', () => showOnly(btn.dataset.go));
  });

  resetBtn.addEventListener('click', () => {
    steps.forEach((s) => (s.hidden = s.dataset.step !== '1'));
    results.forEach((r) => (r.hidden = true));
    resetBtn.hidden = true;
  });
}

// ---------- Scroll-spy on bracket nav ----------
const navItems = document.querySelectorAll('.bnav-item');
const sections = [...navItems].map((item) => document.querySelector(item.getAttribute('href')));

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = '#' + entry.target.id;
      const navItem = document.querySelector(`.bnav-item[href="${id}"]`);
      if (!navItem) return;
      if (entry.isIntersecting) {
        navItems.forEach((n) => n.classList.remove('active'));
        navItem.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach((s) => s && spy.observe(s));
