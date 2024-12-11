<template>
    <!-- <div>
        <h1 dir="ltr" class="text-end" style="white-space: pre-wrap;">{{ category }}</h1>
        <ul>
            <li v-for="item in items" :key="item.id">
                {{ item.name }}
            </li>
        </ul>
    </div> -->
    <!-- {{ categories }} -->
  <CategoryParent :status="getCategoriesRequest.status.value" :categories="categories" class="mb-5" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CategoryParent from '~/components/pages/categories/CategoryParent.vue';


const route = useRoute();
const id = route.params.id;

const getCategoriesRequest = await useApiFetch<Record<string, string>>(`/api/episodes/category/${id}/`, {

});

const categories = computed(() => {
  if (getCategoriesRequest.status.value === 'success') {
    return getCategoriesRequest.data.value.data.map((item) => {
      return {...item, name: item.title}
    });
  }

  return []
})

const items = ref<{ id: number; name: string }[]>([]); 

// const title = `دسته بندی فیلم ها - ${category.value.name}`; 
// const description = `مروری بر دسته بندی ${Categories.value.name} و اطلاعات مربوط به هر دسته.`;
// const keywords = 'فیلم, دسته بندی, سینما'; 

// useSeoMeta({
//     title: title,
//     description: description,
//     keywords: keywords,
//     ogTitle: title,
//     ogDescription: description,
//     ogType: 'website',
//     ogUrl: `https://fiatre.ir/category/${id}`,
//     ogImage: 'https://fiatre.ir/og-image-category.jpg',
//     robots: 'index, follow',
// });
</script>

<style scoped>

</style>
