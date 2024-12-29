<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar /> <!-- Your fixed navbar -->
    <div class="main-content">
      <router-view /> <!-- Content rendered here -->
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .main-content {
    padding-top: 80px;
    padding-bottom: 50px;
    /* Adjust this value to match the navbar height */
  }

}
</style>
