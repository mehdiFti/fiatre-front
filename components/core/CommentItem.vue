<template>
  <div class="comment">
    <img :src="comment.avatar" alt="Avatar" class="comment-avatar">

    <div class="comment-content">
      <div class="comment-header">
        <a class="comment-author">{{ comment.author }}</a>

        <div class="comment-metadata">
          {{ comment.date }}
        </div>
      </div>

      <div class="comment-text">
        {{ comment.text }}
      </div>

      <div class="comment-actions">
        <a class="comment-action" @click="toggleReplyForm">پاسخ</a>
      </div>

      <form v-if="showReplyForm" class="reply-form" @submit.prevent="addReply">
        <textarea v-model="replyText" placeholder="پاسخی بدهید" />

        <PrimaryButton type="submit" text="پاسخ" />
      </form>

      <div v-if="comment.replies && comment.replies.length" class="comment-group">
        <CommentItem v-for="reply in comment.replies" :key="reply.id" :comment="reply" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import PrimaryButton from '~/components/core/PrimaryButton.vue';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  text: string;
  replies?: Comment[];
}

const props = defineProps<{ comment: Comment }>();

const showReplyForm = ref(false);
const replyText = ref('');

const toggleReplyForm = () => {
  showReplyForm.value = !showReplyForm.value;
};

const addReply = () => {
  if (replyText.value.trim()) {
    props.comment.replies = props.comment.replies || [];
    props.comment.replies.push({
      id: Date.now(),
      author: 'یوزر جدید',
      avatar: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
      date: 'هم اکنون',
      text: replyText.value,
      replies: [],
    });
    replyText.value = '';
    showReplyForm.value = false;
  }
};
</script>

<style scoped lang="scss">
.comment {
  display: flex;
  margin-bottom: 20px;

  .comment-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .comment-content {
    flex: 1;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    .comment-header {
      display: flex;
      justify-content: space-between;

      .comment-author {
        font-weight: bold;
      }

      .comment-metadata {
        font-size: 0.8em;
        color: gray;
      }
    }

    .comment-text {
      margin: 5px 0;
    }

    .comment-actions {
      .comment-action {
        cursor: pointer;
        color: #007bff;

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
    }}}
</style>
