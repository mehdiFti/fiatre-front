<template>
  <div>
    <img class="you" src="/public/image/thisis.jpg" alt="">
    <div class="form-wrapper">
      <h2>ورود</h2>
      <form action="#">
        <div class="form-control">
          <input type="text" required>
          <label>ایمیل یا شماره همراه</label>
        </div>
        <div class="form-control">
          <input type="password" required>
          <label>رمز</label>
        </div>
        <button type="submit">ورود به فیاتر</button>
        <div class="form-help">
          <div class="remember-me">
            <input type="checkbox" id="remember-me">
            <label for="remember-me">رمز را به یاد داشته باش</label>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>
<script setup>
// import LogCard from "~/components/core/LogCard.vue";
// definePageMeta({
//   layout: false,
// });
</script>

<style  lang="scss">
@import "/assets/scss/pages/register";
</style>
