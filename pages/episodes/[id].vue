<template>
    <RtlHeader class="mb-5" dir="rtl"/>

    <VideoHeader :movie="movie" :videoUrl="movie.video_mp4" v-if="movie.title" /> 
    
    <VideoDetails dir="rtl" :details="details" mb-5 />
    
 <TheSeparator v-if="galleries.length > 0" title="گالری تصاویر" dir="rtl" class="mt-5" />
  
  <Gallery v-if="galleries.length > 0" :images="galleries" dir="rtl" /> 

    <TheSeparator title="توضیحات" dir="rtl" class="mt-5" />
    
    <VideoDescription :vDescription="vDescription" dir="ltr" />

    <TheSeparator  title="عوامل و بازیگران" dir="rtl" />  
    <!-- v-if="artists.length > 0" -->
    
    <CastCrew  :crews="artists" class="mb-5"/>
    
    <TheSeparator title="عناوین مشابه" dir="rtl" />
    
    <TheSlider class="mb-5" title="کار در سینما" :cardsSlider="cardSlider" />
    
    <CommentSection 
      :comments="comments" 
      v-model="commentText"
      :isSubmitting="isSubmitting"
      @submit="submitComment"
      dir="rtl" 
      class="mb-5"
    >
      <CommentItem 
        v-for="comment in comments" 
        :key="comment.id" 
        :comment="comment"
        @reply-added="handleReplyAdded"
      />
    </CommentSection>
    
    <Footer dir="rtl"/>
    
</template>
           
<script setup lang="ts">

definePageMeta({
  layout: 'custom'
});

import { useRoute } from 'vue-router';
import VideoHeader from '~/components/pages/episode/VideoHeader.vue';
import VideoDetails from '~/components/core/videos/VideoDetails.vue';
import VideoDescription from '~/components/core/videos/VideoDescription.vue';
import CastCrew from '~/components/core/videos/CastCrew.vue';
import CommentSection from '~/components/core/CommentSection.vue';
import TheSlider from '~/components/core/TheSlider.vue';
import Gallery from '~/components/core/Gallery.vue';
import RtlHeader from '~/components/core/RtlHeader.vue';
import Footer from '~/components/core/Footer.vue';
import TheSeparator from '~/components/core/TheSeparator.vue';
import { ref } from 'vue';

const route = useRoute();


const getEpisodeRequest = await useAuthFetch<any>(`/api/episodes/${route.params.id}/`, {
});

const episode = computed(() => {
  if (getEpisodeRequest.status.value === 'success') {
    return getEpisodeRequest.data.value;
  }
  return {};
});

const getEpisodeGalleriesRequest = await useApiFetch<any>(`/api/episodes/${episode.value.slug}/images/gallery/`, {
});

console.log(getEpisodeGalleriesRequest.data.value); // Log the response to inspect it

const galleries = computed(() => {
  if (getEpisodeGalleriesRequest.status.value === 'success') {
    const data = getEpisodeGalleriesRequest.data.value.data; // Access the 'data' property
    if (Array.isArray(data)) {
      return data.map((gallery: any) => ({
        url: gallery.image.startsWith('http') ? gallery.image : `https://www.fiatre.ir${gallery.image}`, // Use the full URL if already present
        alt: `Gallery image ${gallery.id}` // Provide a default alt text
      }));
    } else {
      return [];
    }
  }
  return [];
})

const movie = computed(() => {
  return {
    cover: episode.value.cover,
    title: episode.value.title,
    video: episode.value.video,
    video_mp4: episode.value.video,
    key: episode.value.id,
    image: episode.value.image,
    number: episode.value.number,
    description: episode.value.description,
  }
})

const details = computed(()=>{
return {
genreValue: episode.value.genre,
productValue: episode.value.country,
durationValue: episode.value.time,
ageValue: episode.value.time,
categoryValue: episode.value.category.name,
releaseValue: episode.value.construction_year
}
})

const artists = computed(() => {
  if (getEpisodeRequest.status.value === 'success') {
    const artistIds = getEpisodeRequest.data.value.artists || [];
    return artistIds.map((artistId: number) => ({
      id: artistId,
      link: `/biography/${artistId}`, // Assuming you have a route for artist biography
      // You might need additional data for each artist, adjust as necessary
    }));
  }
  return [];
});

console.log('Artists data:', artists.value);

const vDescription = computed(()=>{
return {

  description: episode.value.description

}
})

// useSeoMeta({
//   title: movie.value.title,
//   ogTitle: movie.value.title,
//   description: details.value.description,
//   ogDescription: details.value.description,
//   ogImage: movie.value.src,
//   keywords: details.value.keywords,
//   robots: 'index, follow'
// });


const getCommentsRequest = await useAuthFetch<any>(`/api/episodes/${episode.value.slug}/comments/`, {
  baseURL: 'https://www.fiatre.ir/',
});

const comments = computed(() => {
  if (getCommentsRequest.status.value === 'success') {
    // First, create a map of parent comments and their replies
    const commentMap = new Map();
    const topLevelComments = [];

    getCommentsRequest.data.value.data.forEach((comment: any) => {
      const formattedComment = {
        id: comment.id,
        text: comment.text,
        created_at: comment.created_at,
        episode: episode.value.id,
        user: {
          first_name: comment.user.first_name,
          last_name: comment.user.last_name,
          avatar: comment.user.avatar.startsWith('http') 
            ? comment.user.avatar 
            : `https://www.fiatre.ir${comment.user.avatar}`
        },
        replies: []
      };

      if (comment.parent) {
        // This is a reply
        const parentComment = commentMap.get(comment.parent.id);
        if (parentComment) {
          parentComment.replies.push(formattedComment);
        }
      } else {
        // This is a top-level comment
        topLevelComments.push(formattedComment);
      }
      
      commentMap.set(comment.id, formattedComment);
    });

    return topLevelComments;
  }
  return [];
});

const commentText = ref('');
const isSubmitting = ref(false);

const submitComment = async () => {
  if (!commentText.value.trim()) return;
  
  isSubmitting.value = true;
  try {
    const response = await useAuthFetch('/api/episodes/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        text: commentText.value,
        episode: episode.value.id,
        parent: null
      }
    });

    if (response.data.value) {
      // Refresh comments
      const newCommentsRequest = await useAuthFetch<any>(
        `/api/episodes/${episode.value.slug}/comments/`
      );
      
      if (newCommentsRequest.data.value) {
        comments.value = newCommentsRequest.data.value.data.map((comment: any) => ({
          id: comment.id,
          text: comment.text,
          created_at: comment.created_at,
          user: {
            first_name: comment.user.first_name,
            last_name: comment.user.last_name,
            avatar: comment.user.avatar.startsWith('http') 
              ? comment.user.avatar 
              : `https://www.fiatre.ir${comment.user.avatar}`
          }
        }));
      }
      
      commentText.value = '';
    }
  } catch (error) {
    console.error('Error posting comment:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const handleReplyAdded = async () => {
  // Refresh comments after reply is added
  const newCommentsRequest = await useAuthFetch<any>(
    `/api/episodes/${episode.value.slug}/comments/`
  );
  
  if (newCommentsRequest.data.value) {
    comments.value = newCommentsRequest.data.value.data.map((comment: any) => ({
      id: comment.id,
      text: comment.text,
      created_at: comment.created_at,
      user: {
        first_name: comment.user.first_name,
        last_name: comment.user.last_name,
        avatar: comment.user.avatar.startsWith('http') 
          ? comment.user.avatar 
          : `https://www.fiatre.ir${comment.user.avatar}`
      }
    }));
  }
};

</script>

<style scoped>

</style>
