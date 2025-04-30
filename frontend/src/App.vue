<script setup lang="ts">

function toggleDarkMode() {
  const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
  localStorage.setItem('darkMode', darkModeEnabled ? 'false' : 'true');
  document.body.classList.toggle('dark-theme', !darkModeEnabled);
}

</script>

<template>
  <div class="centered-container">
    <header class="app-title">Mini Orders</header>
    <main>
      <RouterView />
      <div class="config-bar">
        <button @click="toggleDarkMode()">Toggle Dark Mode</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.centered-container {
  margin: auto;
  width: fit-content;
}

.app-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.config-bar {
  position: fixed;
  right: 4px;
  top: 20px;
}
</style>
