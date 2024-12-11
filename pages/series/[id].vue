<template>

    <RtlHeader class="mb-5" dir="rtl"/>
    
    <RtlImageHeader :imageHeader="imageHeader"/>
    
    <VideoDetails :details="details" />
    
    <VideoSeries class="mb-5" :episodes="episodes" />
    
    <TheSeparator class="ps-4" title="گالری تصاویر" dir="rtl" />
    
    <Gallery class="mb-5" :images="images" dir="rtl" /> 
    
    <TheSeparator class="ps-4" title="توضیحات" dir="rtl" />
    
    <VideoDescription :vDescription="vDescription" />

    <TheSeparator title="عوامل و بازیگران" dir="rtl" />
    
    <CastCrew :crews="crews" class=" mb-5" />
    
    <TheSeparator class="ps-4" title="سریال و " dir="rtl"/>
    
    <TheSlider class="mb-5 " title="کار در سینما" :cardsSlider="cardSlider" />
    
    <CommentSection class="mb-5"/>
    
    
      <Footer dir="rtl"/>
    
    </template>
    
    <script setup lang="ts">

    definePageMeta({
      layout: 'custom'
    });
  
    import VideoDescription from '~/components/core/videos/VideoDescription.vue';
    import RtlImageHeader from '~/components/pages/series/RtlImageHeader.vue';
    import VideoDetails from '~/components/core/videos/VideoDetails.vue';
    import VideoSeries from '~/components/pages/series/VideoSeries.vue';
    import CommentSection from '~/components/core/CommentSection.vue';
    import CastCrew from '~/components/core/videos/CastCrew.vue';
    import TheSlider from '~/components/core/TheSlider.vue';
    import Gallery from '~/components/core/Gallery.vue';
    import Footer from '~/components/core/Footer.vue';
    import RtlHeader from '~/components/core/RtlHeader.vue';
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';

    const route = useRoute();
    const id = route.params.id;

    const details = ref({
    description: '',
    keywords: '',
    });

    const vDescription = ref({
    title: '',
    description: '',
    secondaryTitle: ''
    });

    const imageHeader = ref({ 
    title: '',
    src: '',
    alt: ''
    }); 

    const cardSlider = ref([]);
    const episodes = ref([]);
    const images = ref([]);
    const crews = ref([]);



    onMounted(async () => {
      const response = await fetch(`/api/episode/${id}`);
      const data = await response.json();
    
      imageHeader.value = data.imageHeader;
      details.value = data.details;
      cardSlider.value = data.cardSlider;
      episodes.value = data.episodes;
      images.value = data.images;
      vDescription.value = data.vDescription;
      crews.value = data.crews;
      

      useSeoMeta({
        title: imageHeader.value.title,
        ogTitle: imageHeader.value.title,
        description: details.value.description,
        ogDescription: details.value.description,
        ogImage: imageHeader.value.src,
        keywords: details.value.keywords,
        robots: 'index, follow'
      });
    });
  
    </script>
    
    <style lang="scss">
    
    </style>
