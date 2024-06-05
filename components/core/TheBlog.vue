<template>
  <div class="container mt-5">
    <div class="blog__wrapper">
      <BlogItem
        v-for="item in blogItems"
        :key="item.key"
        :image-src="item.imageSrc"
        :title="item.title"
        :description="item.description"
      />
    </div>
  </div>
</template>

<script setup>
import BlogItem from '~/components/core/BlogItem.vue';

const blogItems = [
  {
    imageSrc: 'https://www.fiatre.ir/uploads/episodes/images/%D9%84%D9%86%D8%B2-%D8%AF%D9%88%D8%B1%D8%A8%DB%8C%D9%86/1672854715.674316-oQQ4UJ9xrat3-1668628588.4868019-Auv4O0kMhkk_DRe5rr3.jpg',
    title: 'What\'s new in 2022 Tech',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!',
    key: 1,
  },
  {
    imageSrc: 'https://www.fiatre.ir/uploads/episodes/images/%D9%84%D9%86%D8%B2-%D8%AF%D9%88%D8%B1%D8%A8%DB%8C%D9%86/1672854715.674316-oQQ4UJ9xrat3-1668628588.4868019-Auv4O0kMhkk_DRe5rr3.jpg',
    title: 'آمورش هنرهای تجسمی بری برای دانشمندان بزرگ کشورهای اسیایای دانشمندان بزرگ کشورهای اسیایی',
    description: 'این متن راست چین از چپ به راست نوشته میشود و در صورتی که بیش از اندازه خاصی باشد اورفلو هیدن میشود',
    key: 2,
  },
  {
    imageSrc: 'https://www.fiatre.ir/uploads/episodes/images/%D9%84%D9%86%D8%B2-%D8%AF%D9%88%D8%B1%D8%A8%DB%8C%D9%86/1672854715.674316-oQQ4UJ9xrat3-1668628588.4868019-Auv4O0kMhkk_DRe5rr3.jpg',
    title: 'Race to your heart content',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!',
    key: 3,
  },
  {
    imageSrc: 'https://www.fiatre.ir/uploads/episodes/images/%D9%84%D9%86%D8%B2-%D8%AF%D9%88%D8%B1%D8%A8%DB%8C%D9%86/1672854715.674316-oQQ4UJ9xrat3-1668628588.4868019-Auv4O0kMhkk_DRe5rr3.jpg',
    title: 'Race to your heart content',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!',
    key: 4,
  },
];
</script>

<style lang="scss">
/* Your CSS goes here */
.container {
  /* Add your container styles here if needed */
}

.blog__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
</style>
