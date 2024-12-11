<template>
  <div class="comment">
    <img :src="comment.user.avatar" :alt="getFullName" class="comment-avatar">

    <div class="comment-content">
      <div class="comment-header">
        <a class="comment-author">{{ getFullName }}</a>

        <div class="comment-metadata">
          {{ formatDate(comment.created_at) }}
        </div>
      </div>

      <div class="comment-text">
        {{ comment.text }}
      </div>

      <div class="comment-actions">
        <a class="comment-action" @click="toggleReplyForm">پاسخ</a>
      </div>

      <form v-if="showReplyForm" class="reply-form" @submit.prevent="addReply">
        <textarea ref="replyTextarea" v-model="replyText" placeholder="پاسخی بدهید" />

        <PrimaryButton type="submit" text="پاسخ" />
      </form>

      <div v-if="comment.replies && comment.replies.length" class="replies-container">
        <CommentItem v-for="reply in comment.replies" :key="reply.id" :comment="reply" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch, nextTick, computed} from 'vue';
import PrimaryButton from '~/components/core/PrimaryButton.vue';

interface User {
  first_name: string;
  last_name: string;
  avatar: string;
}

interface Comment {
  id: number;
  text: string;
  created_at: string;
  user: User;
  replies?: Comment[];
  episode: number;
}

const props = defineProps<{ comment: Comment }>();

const showReplyForm = ref(false);
const replyText = ref('');
const replyTextarea = ref<HTMLTextAreaElement | null>(null);

const getFullName = computed(() => {
  return `${props.comment.user.first_name} ${props.comment.user.last_name}`;
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fa-IR');
};

const toggleReplyForm = () => {
  showReplyForm.value = !showReplyForm.value;
  if (showReplyForm.value) {
    nextTick(() => {
      replyTextarea.value?.focus();
    });
  }
};

const emit = defineEmits<{
  'reply-added': [comment: Comment];
}>();

const addReply = async () => {
  if (replyText.value.trim()) {
    try {
      const response = await useAuthFetch('/api/episodes/comments/', {
        method: 'POST',
        body: JSON.stringify({
          text: replyText.value,
          episode: props.comment.episode,
          parent: props.comment.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.value) {
        emit('reply-added', response.data.value);
        replyText.value = '';
        showReplyForm.value = false;
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  }
};
</script>

<style scoped lang="scss">
.comment {
  display: flex;
  margin: 20px 0;

  .comment-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .comment-content {
    flex: 1;
    background-color: $white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: left !important; 

    .comment-header {
      display: flex;
      justify-content: space-between;

      .comment-author {
        font-weight: bold;
      }

      .comment-metadata {
        font-size: 0.8em;
        color: $gray-400;
      }
    }

    .comment-text {
      margin: 5px 0;
    }

    .comment-actions {
      .comment-action {
        cursor: pointer;
        color: $primary;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .reply-form {
      display: flex;
      flex-direction: column;
      margin-top: 10px;

      textarea {
        resize: none;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 10px;
        font-size: 14px
        }
    }

    .replies-container {
      margin-left: 20px;
    }
  }
}
</style>