<template>
  <div class="container">
    <div class="crew-wrapper">
      <div class="crew-static">
        عوامل و بازیگران
      </div>

      <hr>

      <div class="crew-flex">
        <div v-for="crew in crews" :key="crew.id">
          <nuxt-img
            class="crew-card"
            :src="crew.src || 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/person-profile-icon.png'"
            alt="Crew image"
          />

          <div class="crew-name">
            {{ crew.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const crews = [
  {
    src: 'https://i.insider.com/60f9c4dd0729770012b96150?width=700',
    title: 'کیت بکیسنل',
    id: 1,
  },
  {
    src: 'https://i0.wp.com/www.thewrap.com/wp-content/uploads/2021/06/Megan-Boone.jpg?fit=936%2C527&ssl=1',
    title: 'مگان بون',
    id: 2,
  },
  {
    src: '',
    title: 'ممد نوبری',
    id: 3,
  },
  {
    src: '',
    title: 'عواملینو فرمینو',
    id: 4,
  },
];
</script>

<style lang="scss">


.crew-wrapper {
  padding:30px 10px;
  background: $light;

  gap: 20px;

  .crew-static {
    font-size: 18px;
    font-weight: bold;
    color: $dark;

  }
  > hr {
    width: 40%;
    color: $dark;
    padding-bottom: 10px;
  }
}

.crew-flex {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  .crew-card {
    padding-top: 10px;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {

    }
  }

  .crew-name {
    text-align: center;
    margin-top: 10px;
  }
}

</style>
