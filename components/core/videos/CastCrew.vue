<template>
  <div class="container">
    <div class="crew-wrapper">
      <TheSeparator title="عوامل و بازیگران" />

      <div class="crew-flex">
        <div v-for="crew in crews" :key="crew.id">
          <div class="card-container">
            <NuxtLink :to="crew.link">
              <nuxt-img
                class="crew-card"
                link="crew.src "
                :src="crew.src || defaultImage "
                alt="Crew image"
                :style="{ 'pointer-events': crew.src ? 'auto' : 'none' }"
              />
            </NuxtLink>
          </div>

          <div class="crew-name">
            {{ crew.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheSeparator from '~/components/core/TheSeparator.vue';

const defaultImage = 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/person-profile-icon.png';
const crews = [
  {
    src: 'https://i.insider.com/60f9c4dd0729770012b96150?width=700',
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
    title: 'کیت بکیسنل',
    id: 1,
  },
  {
    src: 'https://i0.wp.com/www.thewrap.com/wp-content/uploads/2021/06/Megan-Boone.jpg?fit=936%2C527&ssl=1',
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
    title: 'مگان بون',
    id: 2,
  },
  {
    src: '',
    title: 'ممد نوبری',
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
    id: 3,
  },
  {
    src: '',
    title: 'عواملینو فرمینو',
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
    id: 4,
  },
];
</script>

<style lang="scss">
.crew-wrapper {
  padding:40px 10px 10px;
  background: $light;

}

.crew-flex {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  .card-container {
    width: 150px;
    height: 150px;

  }
  .crew-card {
    background: $light;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  .crew-card:hover {
    transform: scale(1.1);
    cursor: pointer;
    box-shadow: 0 0 10px rgba($primary, 1);
  }

  .crew-name {
    text-align: center;
    margin-top: 14px;
    font-weight: bold;
  }
}
</style>
