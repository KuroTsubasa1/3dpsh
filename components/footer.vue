<script setup lang="ts">
defineProps({
  companyName: {
    type: String,
    default: '3D Print Shop Harm'
  },
  year: {
    type: Number,
    default: new Date().getFullYear()
  }
});
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer-row">
        <div class="footer-col">
          <h4>About Us</h4>
          <p>{{ companyName }} is a leading provider of 3D printing services, offering innovative solutions for
            businesses and individuals alike. Our mission is to make 3D printing accessible, affordable, and
            efficient for everyone.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact Us</h4>
          <p>1234 Example Street<br>City, ST 12345</p>
          <p>Email: info@3dprintshopharm.com<br>Phone: (555) 123-4567</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ year }} {{ companyName }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #1F2226;
  color: #FFFFFF;
  padding: 32px 0;
  margin-top: 48px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.footer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 32px;
}

.footer-col {
  flex: 1;
}

.footer-col h4 {
  font-size: 20px;
  margin-bottom: 16px;
}

.footer-col p,
.footer-col li a {
  font-size: 16px;
  line-height: 1.5;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 8px;
}

.footer-col li a {
  color: #9ACDFF;
  text-decoration: none;
}

.footer-col li a:hover {
  text-decoration: underline;
}

.footer-bottom {
  font-size: 14px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 16px;
}

@media (max-width: 768px) {
  .footer-col {
    flex: none;
    width: 100%;
    margin-bottom: 16px;
  }

  .footer-row {
    gap: 16px;
  }
}
</style>