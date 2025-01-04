<template>
  <div class="comment-section container" dir="rtl">
    <div class="comment-wrapper">
      <TheSeparator title="نظرات" />

      <div class="comment-group">
        <CommentItem v-for="comment in displayedComments" :key="comment.id" :comment="comment"
          :isMobileView="isMobileView" />
      </div>

      <form class="comment-form" @submit.prevent="handleSubmit">
        <textarea :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
          class="comment-textarea" placeholder="نظرتان چیست؟" :disabled="isSubmitting" />

        <PrimaryButton type="submit" text="ثبت نظر" :disabled="isSubmitting" />
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, onMounted, onUnmounted } from 'vue';
import CommentItem from './CommentItem.vue';
import PrimaryButton from '~/components/core/PrimaryButton.vue';
import TheSeparator from '~/components/core/TheSeparator.vue';

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
  parent?: Comment;
  episode: number;
}

const props = defineProps<{
  comments: Comment[];
  modelValue: string;
  isSubmitting: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'submit': [];
}>();

const isMobileView = ref(false);

const displayedComments = computed(() => {
  if (isMobileView.value) {
    // Flatten comments for mobile view
    const flattened: Comment[] = [];
    const flatten = (comments: Comment[], parent?: Comment) => {
      comments.forEach(comment => {
        flattened.push({ ...comment, parent });
        if (comment.replies && comment.replies.length) {
          flatten(comment.replies, comment);
        }
      });
    };
    flatten(props.comments);
    return flattened.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
  return props.comments;
});

onMounted(() => {
  checkMobileView();
  window.addEventListener('resize', checkMobileView);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobileView);
});

const checkMobileView = () => {
  isMobileView.value = window.innerWidth < 700;
};

const handleSubmit = () => {
  if (props.modelValue.trim()) {
    emit('submit');
  }
};
</script>

<style lang="scss">
.comment-wrapper {
  padding: 40px 10px 10px;

  >.comment-form {
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  .comment-textarea {
    resize: none;
    padding: 10px;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: left;

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }
}
</style>
