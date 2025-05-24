<template>
  <section class="contact">
    <h2>Contact Us</h2>
    <form>
      <div class="form-row">
        <div class="form-group form-col">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" class="form-control">
        </div>
        <div class="form-group form-col">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" class="form-control">
        </div>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" class="form-control" rows="5"></textarea>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="#" class="btn btn-primary">Submit</a>
      </div>
    </form>
  </section>
</template>

<style scoped>
.contact {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 40px;
  margin: 40px 0;
}

.contact form {
  max-width: 800px;
  margin: 0 auto;
}

.form-control {
  padding: 12px;
  font-size: 16px;
}

.contact h2 {
  color: var(--accent-color);
}

@media (max-width: 768px) {
  .contact {
    padding: 20px;
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .form-col {
    width: 100%;
    margin-right: 0;
  }
}
</style>