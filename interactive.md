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
.interactive-box img {
  max-width: 100%;
  height: auto;
}
.hidden {
  display: none;
}
</style>

<div class="interactive-container">
  <div id="box-left" class="interactive-box">
    <img src="/assets/img/profileA.png" alt="Profile A">
  </div>
  <div id="box-right" class="interactive-box">
    <img src="/assets/img/profileB.png" alt="Profile B">
  </div>
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

