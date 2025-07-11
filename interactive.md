---
layout: page
title: Interactive Demo
permalink: /interactive/
---

<style>
.interactive-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap;
}
.interactive-box {
  border: 1px solid #ccc;
  padding: 40px;
  margin: 10px;
  cursor: pointer;
  text-align: center;
  flex: 1;
  min-width: 200px;
}
.interactive-box img {
  max-width: 100%;
  height: auto;
}
.hidden {
  display: none;
}
#reset-button {
  padding: 10px 20px;
  font-size: 1em;
}
</style>

<div class="interactive-container">
  <div id="box-left" class="interactive-box" role="button" tabindex="0" aria-label="Choose Left Option">
    <img src="/assets/img/profileA.png" alt="Profile A">
    <div id="widget-container" class="hidden"></div>
  </div>
  <div id="box-right" class="interactive-box" role="button" tabindex="0" aria-label="Choose Right Option">
    <img src="/assets/img/profileB.png" alt="Profile B">
  </div>
</div>

<div id="result" style="text-align:center; font-weight:bold; font-size:1.5em;" aria-live="polite"></div>

<div style="text-align:center; margin-top:10px;">
  <button id="reset-button" class="hidden">Return</button>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    const left = document.getElementById('box-left');
    const right = document.getElementById('box-right');
    const result = document.getElementById('result');
    const resetButton = document.getElementById('reset-button');
    const widgetContainer = document.getElementById('widget-container');

    function loadWidget() {
      widgetContainer.innerHTML = '<elevenlabs-convai agent-id="agent_01jzkq8v1sf1ctbsswk0xykeq5"></elevenlabs-convai>';
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }

    function handleLeftChoice() {
      right.classList.add('hidden');
      result.textContent = 'LEFT';
      resetButton.classList.remove('hidden');
      widgetContainer.classList.remove('hidden');
      loadWidget();
    }

    function handleRightChoice() {
      left.classList.add('hidden');
      result.textContent = 'RIGHT';
      resetButton.classList.remove('hidden');
      widgetContainer.innerHTML = '';
      widgetContainer.classList.add('hidden');
    }

    function reset() {
      left.classList.remove('hidden');
      right.classList.remove('hidden');
      result.textContent = '';
      widgetContainer.innerHTML = '';
      widgetContainer.classList.add('hidden');
      resetButton.classList.add('hidden');
    }

    left.addEventListener('click', handleLeftChoice);
    right.addEventListener('click', handleRightChoice);
    resetButton.addEventListener('click', reset);

    // Optional: Add keyboard accessibility
    left.addEventListener('keypress', e => { if (e.key === 'Enter') handleLeftChoice(); });
    right.addEventListener('keypress', e => { if (e.key === 'Enter') handleRightChoice(); });
  });
</script>
