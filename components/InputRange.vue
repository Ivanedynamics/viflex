<script setup lang="ts">
import { ref, onMounted } from "vue";
const minprice = ref(1000);
const maxprice = ref(7000);
const min = ref(100);
const max = ref(10000);
const minthumb = ref(0);
const maxthumb = ref(0);
</script>
<template>
  <div class="slider">
    <input
      type="range"
      value="20"
      oninput="this.style.setProperty('--start', this.value + '%')"
    />
    <input
      type="range"
      value="80"
      oninput="this.previousElementSibling.style.setProperty('--stop', this.value + '%')"
    />
  </div>
</template>

<style>
.slider input {
  --start: 20%;
  --stop: 80%;
  -webkit-appearance: none;
  appearance: none;
  background: none;
  pointer-events: none;
  position: absolute;
  height: 4px;
  width: 100%;
}

.slider input:first-of-type {
  background-image: linear-gradient(
    to right,
    lightgrey var(--start),
    dodgerblue var(--start),
    dodgerblue var(--stop),
    lightgrey var(--stop)
  );
}

.slider ::-moz-range-thumb {
  cursor: pointer;
  pointer-events: auto;
}
.slider ::-webkit-slider-thumb {
  cursor: pointer;
  pointer-events: auto;
}
</style>
