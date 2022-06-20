<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
  <header>
    <div>
      <nav class="navbar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/users">Users</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
.navbar {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
