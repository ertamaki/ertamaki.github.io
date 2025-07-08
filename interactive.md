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
}
.interactive-box {
  border: 1px solid #ccc;
  padding: 40px;
  margin: 10px;
  cursor: pointer;
  text-align: center;
  flex: 1;
}
.hidden {
  display: none;
}
</style>

<div class="interactive-container">
  <div id="box-left" class="interactive-box">Left</div>
  <div id="box-right" class="interactive-box">Right</div>
</div>

<div id="result" style="text-align:center; font-weight:bold; font-size:1.5em;"></div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const left = document.getElementById('box-left');
    const right = document.getElementById('box-right');
    const result = document.getElementById('result');

    left.addEventListener('click', function() {
      right.classList.add('hidden');
      result.textContent = 'LEFT';
    });

    right.addEventListener('click', function() {
      left.classList.add('hidden');
      result.textContent = 'RIGHT';
    });
  });
</script>

