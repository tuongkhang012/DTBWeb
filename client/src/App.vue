<template>
  <body>
    <div id="page-container">
      <div id="content-container">
        <AppHeader />
        <router-view />
      </div>
    </div>
  </body>
</template>

<script>
import AppHeader from "./components/HeaderComponent.vue"
export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
