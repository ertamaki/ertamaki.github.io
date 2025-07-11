---
layout: page
title: Interactive Demo
permalink: /interactive/
---

<style>
/* ---------- visual layout ---------- */
.interactive-container{
  display:flex;justify-content:center;margin:20px 0;flex-wrap:wrap;
}
.interactive-box{
  border:1px solid #ccc;padding:40px;margin:10px;cursor:pointer;
  text-align:center;flex:1;min-width:200px;
}
.interactive-box img{max-width:100%;height:auto;}
.hidden{display:none;}
#reset-button{padding:10px 20px;font-size:1em;}
</style>

<div class="interactive-container">
  <div id="box-left"  class="interactive-box" role="button" tabindex="0" aria-label="Choose Left">
    <img src="/assets/img/profileA.png" alt="Profile A">
    <div id="widget-container" class="hidden"></div>
  </div>
  <div id="box-right" class="interactive-box" role="button" tabindex="0" aria-label="Choose Right">
    <img src="/assets/img/profileB.png" alt="Profile B">
  </div>
</div>

<div id="result" style="text-align:center;font-weight:bold;font-size:1.5em;" aria-live="polite"></div>

<div style="text-align:center;margin-top:10px;">
  <button id="reset-button" class="hidden">Return</button>
</div>

<!-- ①  LOAD THE WIDGET LIBRARY ONCE, *BEFORE* THE PAGE’S OWN JS RUNS -->
<script src="https://elevenlabs.io/convai-widget/index.js" type="text/javascript"></script>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const left      = document.getElementById('box-left');
  const right     = document.getElementById('box-right');
  const result    = document.getElementById('result');
  const resetBtn  = document.getElementById('reset-button');
  const widgetBox = document.getElementById('widget-container');

  /* ---------- helper to mount (or remount) the widget ---------- */
  function mountWidget() {
    widgetBox.innerHTML =
      '<elevenlabs-convai agent-id="agent_01jzkq8v1sf1ctbsswk0xykeq5"></elevenlabs-convai>';
    widgetBox.classList.remove('hidden');

    if (window.ElevenLabsConvai?.mountAll) {
      window.ElevenLabsConvai.mountAll();
    } else {
      /* falls back to retry until the script finishes parsing */
      let attempts = 0;
      const timer = setInterval(() => {
        if (window.ElevenLabsConvai?.mountAll) {
          clearInterval(timer);
          window.ElevenLabsConvai.mountAll();
        } else if (++attempts === 30) {          // 3 s timeout
          clearInterval(timer);
          console.error('Timed-out waiting for ElevenLabsConvai.');
        }
      }, 100);
    }
  }

  /* ---------- ui state handlers ---------- */
  function pickLeft()  { right.classList.add('hidden'); result.textContent='LEFT';
                         resetBtn.classList.remove('hidden'); mountWidget(); }
  function pickRight() { left .classList.add('hidden'); result.textContent='RIGHT';
                         resetBtn.classList.remove('hidden');
                         widgetBox.innerHTML=''; widgetBox.classList.add('hidden'); }
  function reset()     { left .classList.remove('hidden'); right.classList.remove('hidden');
                         result.textContent=''; widgetBox.innerHTML='';
                         widgetBox.classList.add('hidden'); resetBtn.classList.add('hidden'); }

  left .addEventListener('click', pickLeft);   left .addEventListener('keypress', e => e.key==='Enter'&&pickLeft());
  right.addEventListener('click', pickRight);  right.addEventListener('keypress',e => e.key==='Enter'&&pickRight());
  resetBtn.addEventListener('click', reset);
});
</script>
