<script setup>
import './assets/global.css';
</script>

<template>
  <header>
    <nav>
      <router-link to="/home">Home</router-link>
      <router-link to="/chat">Chat</router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>

</template>

<style scoped>
nav {
  display: flex;
  gap: 20px;
  justify-content: center;
  cursor: pointer !important;

}
nav router-link:hover {
  font-weight: bold;
}

nav a {
  text-decoration: none;
  color: white;
}

nav a.router-link-active {
  font-weight: bold;
  color: #00ADB5;
}

</style>
