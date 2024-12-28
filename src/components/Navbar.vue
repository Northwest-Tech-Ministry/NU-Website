<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link class="navbar-brand" to="/">INTC 4383: Operating System & Networking</router-link>

      <!-- Toggler button for mobile view -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <!-- Schedule Link -->
          <li class="nav-item">
            <router-link class="nav-link" to="/schedule">Schedule</router-link>
          </li>

          <!-- Class Dropdown -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="classDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Class
            </a>
            <ul class="dropdown-menu" aria-labelledby="classDropdown">
              <li>
                <router-link class="dropdown-item" to="/overview">Overview</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/general">Course Structure</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/honesty">Academic Honesty</router-link>
              </li>
            </ul>
          </li>

          <!-- Labs Dropdown -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="labsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Labs
            </a>
            <ul class="dropdown-menu" aria-labelledby="labsDropdown">
              <li>
                <router-link class="dropdown-item" to="/tools">Tools</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/guidance">Guidance</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/labs/util">Lab Utilities</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/labs/syscall">Lab System Calls</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/labs/pgtbl">Lab Page Tables</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/labs/traps">Lab Traps</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/labs/cow">Lab Copy-On-Write</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/labs/thread">Lab Multithreading</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/labs/lock">Lab Lock</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/labs/fs">Lab File System</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/labs/net">Lab Network Driver</router-link>
              </li>
            </ul>
          </li>

          <!-- xv6 Dropdown -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="xv6Dropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              xv6
            </a>
            <ul class="dropdown-menu" aria-labelledby="xv6Dropdown">
              <li>
                <router-link class="dropdown-item" to="/xv6">xv6</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/xv6-book">xv6 Book</router-link>
              </li>

            </ul>
          </li>

          <!-- References Link -->
          <li class="nav-item">
            <router-link class="nav-link" to="/reference">References</router-link>
          </li>
        </ul>

        <!-- Right-aligned text -->
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <p class="navbar-text">2025</p>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  margin-bottom: 1rem;
}
</style>
