---
layout: page
title: Interactive Demo
permalink: /interactive/
---

<style>
/* — styles unchanged — */
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

<!-- ① Load the ElevenLabs widget *once* – before any of our own JS runs -->
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const left      = document.getElementById('box-left');
  const right     = document.getElementById('box-right');
  const result    = document.getElementById('result');
  const resetBtn  = document.getElementById('reset-button');
  const widgetBox = document.getElementById('widget-container');

  /** Adds the custom element then waits until the library is ready */
  function mountWidget() {
    widgetBox.innerHTML =
      '<elevenlabs-convai agent-id="agent_01jzkq8v1sf1ctbsswk0xykeq5"></elevenlabs-convai>';
    widgetBox.classList.remove('hidden');

    waitForConvai(() => {
      window.ElevenLabsConvai.mountAll();
      attachDebugEvents();
    });
  }

  /** Poll until the global shows up (max 3 s) */
  function waitForConvai(cb, t = 0) {
    if (window.ElevenLabsConvai?.mountAll) return cb();
    if (t > 3000) return console.error('Timed-out waiting for ElevenLabsConvai.');
    setTimeout(() => waitForConvai(cb, t + 100), 100);
  }

  /** Console helpers so you see call-state / errors */
  function attachDebugEvents() {
    const el = widgetBox.querySelector('elevenlabs-convai');
    if (!el || el.__debugAttached) return;
    el.__debugAttached = true;

    el.addEventListener('elevenlabs-convai:error',
      e => console.error('Widget error:', e.detail));
    el.addEventListener('elevenlabs-convai:call-started',
      () => console.log('Call started'));
    el.addEventListener('elevenlabs-convai:call-ended',
      e => console.log('Call ended', e.detail));
  }

  /* UI handlers */
  function pickLeft()  { right.classList.add('hidden'); result.textContent = 'LEFT';
                         resetBtn.classList.remove('hidden'); mountWidget(); }
  function pickRight() { left .classList.add('hidden'); result.textContent = 'RIGHT';
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
