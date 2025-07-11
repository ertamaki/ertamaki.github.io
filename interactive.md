---
layout: page
title: Interactive Demo
permalink: /interactive/
---

<style>
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
  <div id="box-left" class="interactive-box" role="button" tabindex="0"
       aria-label="Choose Left Option">
    <img src="/assets/img/profileA.png" alt="Profile A">
    <div id="widget-container" class="hidden"></div>
  </div>
  <div id="box-right" class="interactive-box" role="button" tabindex="0"
       aria-label="Choose Right Option">
    <img src="/assets/img/profileB.png" alt="Profile B">
  </div>
</div>

<div id="result" style="text-align:center;font-weight:bold;font-size:1.5em;"
     aria-live="polite"></div>

<div style="text-align:center;margin-top:10px;">
  <button id="reset-button" class="hidden">Return</button>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const left     = document.getElementById('box-left');
  const right    = document.getElementById('box-right');
  const result   = document.getElementById('result');
  const resetBtn = document.getElementById('reset-button');
  const widgetEl = document.getElementById('widget-container');

  let scriptLoaded    = false;
  let widgetMounted   = false;

  /** Mounts (or re-mounts) the ElevenLabs widget */
  function mountWidget() {
    widgetEl.innerHTML =
      '<elevenlabs-convai agent-id="agent_01jzkq8v1sf1ctbsswk0xykeq5"></elevenlabs-convai>';
    widgetEl.classList.remove('hidden');

    if (!scriptLoaded) {
      const s = document.createElement('script');
      s.src   = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      s.async = true;
      s.onload = () => {
        scriptLoaded = true;
        widgetMounted = true;
        window.ElevenLabsConvai?.mountAll();
        attachDebugListeners();
      };
      document.body.appendChild(s);
    } else {
      // re-initialise the widget on subsequent clicks
      if (window.ElevenLabsConvai?.mountAll) {
        window.ElevenLabsConvai.mountAll();
        if (!widgetMounted) attachDebugListeners();
      }
    }
  }

  /** Attach listeners once so we can see errors in the console */
  function attachDebugListeners() {
    const convai = document.querySelector('elevenlabs-convai');
    if (!convai) return;
    widgetMounted = true;

    convai.addEventListener('elevenlabs-convai:error', e =>
      console.error('Widget error:', e.detail)
    );
    convai.addEventListener('elevenlabs-convai:call-started', () =>
      console.log('Call started')
    );
    convai.addEventListener('elevenlabs-convai:call-ended', e =>
      console.log('Call ended:', e.detail)
    );
  }

  /** UI handlers */
  function pickLeft()  { right.classList.add('hidden'); result.textContent='LEFT';
                         resetBtn.classList.remove('hidden'); mountWidget(); }
  function pickRight() { left.classList.add('hidden');  result.textContent='RIGHT';
                         resetBtn.classList.remove('hidden');
                         widgetEl.classList.add('hidden'); widgetEl.innerHTML=''; }

  function reset()     { left.classList.remove('hidden'); right.classList.remove('hidden');
                         result.textContent=''; widgetEl.innerHTML='';
                         widgetEl.classList.add('hidden'); resetBtn.classList.add('hidden'); }

  left.addEventListener('click', pickLeft);
  right.addEventListener('click', pickRight);
  resetBtn.addEventListener('click', reset);

  // keyboard support
  left.addEventListener('keypress', e => e.key==='Enter' && pickLeft());
  right.addEventListener('keypress', e => e.key==='Enter' && pickRight());
});
</script>
