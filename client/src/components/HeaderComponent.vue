<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
    <div class="container-fluid">
      <!-- logged in as Student -->
      <div v-if="showStudentBoard" class="collapse navbar-collapse" id="navbarNavDropdown">
        <router-link class="navbar-brand" to="/studenthome">
          Δ
        </router-link>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/studenthome">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/lesson">Lesson</router-link>
          </li>
        </ul>
      </div>
      <!-- logged in as  -->
      <div v-else-if="showLecturerBoard" class="collapse navbar-collapse" id="navbarNavDropdown">
        <router-link class="navbar-brand" to="/lecturerhome">
          Δ
        </router-link>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/lecturerhome">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/lesson">Lesson</router-link>
          </li>
        </ul>
      </div>
      <!-- logged in as Admin -->
      <div v-else-if="showAdminBoard" class="collapse navbar-collapse" id="navbarNavDropdown">
        <router-link class="navbar-brand" to="/adminhome">
          Δ
        </router-link>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/adminhome">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>
        </ul>
      </div>
      <!-- unlogged in -->
      <div v-else class="collapse navbar-collapse" id="navbarNavDropdown">
        <router-link class="navbar-brand" to="/">
          Δ
        </router-link>
      </div>
      <!-- right handside -->
      <div v-if="currentUser" class="ms-auto">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a @click.prevent="logOut" class="nav-link" to="/">Logout</a>
          </li>
        </ul>
      </div>
      <div v-else class="ms-auto">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </template>
  
  <script>
  export default {
      name:"AppHeader",
      computed: {
        currentUser() {
          return this.$store.state.user;
        },
        showStudentBoard() {
          if (this.currentUser && this.currentUser.Role) {
            return this.currentUser.Role === 'ROLE_STUDENT';
          }
  
          return false;
        },
        showLecturerBoard() {
          if (this.currentUser && this.currentUser.Role) {
            return this.currentUser.Role === 'ROLE_LECTURER';
          }
  
          return false;
        },
        showAdminBoard() {
          if (this.currentUser && this.currentUser.Role) {
            return this.currentUser.Role === 'ROLE_ADMIN';
          }
  
          return false;
        }
      },
      methods: {
        logOut() {
          this.$store.dispatch('logout');
          this.$router.push('/login');
        }
      }
  }
  </script>
  
  <style scoped>
  </style> 