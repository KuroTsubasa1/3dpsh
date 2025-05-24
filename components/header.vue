<script setup lang="ts">
defineProps({
  showBreadcrumbs: {
    type: Boolean,
    default: true
  },
  currentPage: {
    type: String,
    default: 'Home'
  }
});
</script>

<template>
  <div class="header">
    <div class="container">
      <header>
        <nav>
          <!-- Logo -->
          <div class="logo-mobile">
            <a href="#" class="logo">3D Print Shop Harm</a>
          </div>

          <!-- Navigation -->
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>

        <!-- Breadcrumbs -->
        <nav v-if="showBreadcrumbs" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li v-if="currentPage !== 'Home'" class="breadcrumb-item active" aria-current="page">{{ currentPage }}</li>
          </ol>
        </nav>
      </header>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: #1F2226;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

nav li {
  margin-left: 20px;
}

nav a {
  color: var(--text-color);
  font-weight: 700;
  text-decoration: none;
}

nav a:hover {
  color: var(--accent-color);
}

.logo {
  font-size: 24px;
  font-weight: 600;
  color: #FFFFFF;
  text-decoration: none;
}

.breadcrumb {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 16px 0;
  background-color: transparent;
}

.breadcrumb-item {
  font-size: 16px;
}

.breadcrumb-item + .breadcrumb-item:before {
  content: ">";
  display: inline-block;
  margin: 0 8px;
  color: #888;
}

.breadcrumb-item a {
  color: #9ACDFF;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

.breadcrumb-item.active {
  color: #FFFFFF;
}

@media (max-width: 991px) {
  nav {
    flex-wrap: wrap;
    padding-top: 0;
    margin-top: 0;
  }

  nav ul {
    margin-top: 20px;
    justify-content: center;
    width: 100%;
  }

  nav ol {
    margin-top: 20px;
    justify-content: center;
    width: 100%;
  }

  nav .logo-mobile {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>