<script setup lang="ts">
</script>

<template>
  <div class="centered-container">
    <header class="app-title">Mini Orders</header>
    <main>
      <RouterView />
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
</style>
