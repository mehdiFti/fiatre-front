<template>
    <div>
      <ModalWarn dir="rtl"/>
      <!-- For series -->
      <div v-if="series.length > 0">
        <RtlImageHeader :imageHeader="imageHeader" />
        <VideoDetails dir="rtl" :details="details" :isSeries="series.length > 0" mb-5 />
        <VideoSeries 
          v-if="userStore.user?.is_subscription_active"
          class="mb-5" 
          :episodes="series" 
          :onPause="handleVideoPause"
        />
        </div>
      <!-- For single episode -->
      <div v-else>
        <VideoHeader 
          v-if="userStore.user?.is_subscription_active && movie.title" 
          :movie="movie" 
          :videoUrl="movie.video_mp4"
          :onPause="handleVideoPause"
          :startTime="movie.lastWatchedSecond"
        /> 
        <RtlImageHeader 
          v-else
          :imageHeader="imageHeader" 
        />
      <VideoDetails dir="rtl" :details="details" :isSeries="series.length > 0" mb-5 />
      </div>
      


    
    <TheSeparator v-if="galleries.length > 0" title="گالری تصاویر" dir="rtl" class="mt-5" />
  
    <Gallery v-if="galleries.length > 0" :images="galleries" dir="rtl" /> 

    <TheSeparator title="توضیحات" dir="rtl" class="mt-5" />
    
    <VideoDescription :vDescription="vDescription" dir="ltr" />

    <TheSeparator v-if="artists.length > 0"  title="عوامل و بازیگران" dir="rtl" />  

    <CastCrew v-if="artists.length > 0"  :crews="artists" class="mb-5"/>
    
    <TheSeparator v-if="cardSlider.length > 0" title="عناوین مشابه" dir="rtl" />
    
    <TheSlider class="mb-5" :cardsSlider="cardSlider" />

    
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
    
    <Footer dir="rtl" />

  </div>
</template>
           
<script setup lang="ts">

definePageMeta({
  layout: 'custom'
});

import { useRoute } from 'vue-router';
import RtlImageHeader from '~/components/pages/series/RtlImageHeader.vue';
import VideoHeader from '~/components/pages/episode/VideoHeader.vue';
import VideoDetails from '~/components/core/videos/VideoDetails.vue';
import VideoSeries from '~/components/pages/series/VideoSeries.vue';
import VideoDescription from '~/components/core/videos/VideoDescription.vue';
import CastCrew from '~/components/core/videos/CastCrew.vue';
import CommentSection from '~/components/core/CommentSection.vue';
import TheSlider from '~/components/core/TheSlider.vue';
import Gallery from '~/components/core/Gallery.vue';
import Footer from '~/components/core/Footer.vue';
import TheSeparator from '~/components/core/TheSeparator.vue';
import { ref, computed, watch } from 'vue';
import ModalWarn from '~/components/core/ModalWarn.vue';
import { useUserStore } from '~/stores/userStore';
import CommentItem from '~/components/core/CommentItem.vue';
import { useRelatedEpisodes } from '~/composables/useRelatedEpisodes'

const userStore = useUserStore();
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

console.log(getEpisodeGalleriesRequest.data.value); 

const galleries = computed(() => {
  if (getEpisodeGalleriesRequest.status.value === 'success') {
    const data = getEpisodeGalleriesRequest.data.value.data; 
    if (Array.isArray(data)) {
      return data.map((gallery: any) => ({
        url: gallery.image.startsWith('http') ? gallery.image : `https://www.fiatre.ir${gallery.image}`,
        alt: `Gallery image ${gallery.id}` 
      }));
    } else {
      return [];
    }
  }
  return [];
})

const imageHeader = computed(() => {
  return {
    src: episode.value.cover,
    title: episode.value.title
  }
})

const movie = computed(() => {
  return {
    cover: episode.value.cover,
    title: episode.value.title,
    video: episode.value.video,
    video_mp4: episode.value.video_mp4,
    key: episode.value.id,
    image: episode.value.image,
    number: episode.value.number,
    description: episode.value.description,
    lastWatchedSecond: episode.value.last_episode_watch_log?.second || 0
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
  if (getEpisodeRequest.status.value === 'success' && getEpisodeRequest.data.value.artists) {
    return getEpisodeRequest.data.value.artists.map((artist: any) => ({
      id: artist.id,
      link: `/biography/${artist.slug}`,
      src: artist.image.startsWith('http') ? artist.image : `https://www.fiatre.ir${artist.image}`,
      title: artist.name,
      specialty: artist.specialty
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

const series = computed(() => {
  if (episode.value.other_episodes?.length) {
    return [episode.value, ...episode.value.other_episodes].map(ep => ({
      key: ep.id.toString(),
      title: ep.title,
      src: ep.video_mp4,
      poster: ep.image,
      number: ep.episode,
      description: ep.description,
      lastWatchedSecond: ep.last_episode_watch_log?.second || 0
    }));
  }
  return [];
});


const episodeId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
const { relatedEpisodes } = useRelatedEpisodes(artists, episodeId);
const cardSlider = computed(() => relatedEpisodes.value || []);

const handleVideoPause = async (currentTime: number) => {
  try {
    await useAuthFetch(`/api/episodes/${episode.value.slug}/watch/log/`, {
      method: 'post',
      body: `second=${currentTime}&episode=${episode.value.id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  } catch (error) {
    console.error('Failed to update watch time:', error);
  }
};

</script>

<style scoped>

</style>
