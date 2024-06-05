<template>
  <div class="comment-section container">
    <div class="comment-wrapper">
      <TheSeparator
        title="نظرات"
      />

      <div class="comment-group">
        <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
      </div>

      <form class="comment-form" @submit.prevent="addComment">
        <textarea v-model="newCommentText" class="comment-textarea" placeholder="نظرتان چیست؟" />

        <PrimaryButton type="submit" text="ثبت نظر" />
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import CommentItem from './CommentItem.vue';
import PrimaryButton from '~/components/core/PrimaryButton.vue';
import TheSeparator from '~/components/core/TheSeparator.vue';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  text: string;
  replies?: Comment[];
}

const comments = ref<Comment[]>([
  {
    id: 1,
    author: 'مهدی فتاحی',
    avatar: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
    date: ' 5 مهر 13:52',
    text: 'درست کار میکه؟',
    replies: [],
  },
  {
    id: 2,
    author: 'محمد کاظمی',
    avatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
    date: 'دیروز 12:45',
    text: 'اطراف ژاک لکوک فیلمی مستند از پاتریک لکوک است. این مستند سندی ارزشمند است که به ما امکان می‌دهد آموزش تربیتی او را که توسط خودش از طریق کنفرانس‌ها و مصاحبه‌های مختلف منتقل شده است، بهتر درک کنیم. هنرپیشه، کارگردان تئاتر و مربی، ژاک لکوک موفق شد در مدرسه بین‌المللی خود در پاریس، یک مرکز تحقیقاتی بر اساس حرکت ایجاد کند، که با آن آموزش تئاتر را در نیمه دوم قرن بیستم متحول کرد.',
    replies: [
      {
        id: 3,
        author: 'فلانی @bitbax ',
        avatar: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
        date: 'امروز',
        text: 'بناز عجب کامنت سکشنی شد',
        replies: [],
      },
    ],
  },
  {
    id: 4,
    author: 'ایمان فتاحی',
    avatar: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
    date: '4 روز قبل',
    text: 'فکر میکنم درست کار کنه',
    replies: [],
  },
]);

const newCommentText = ref<string>('');
let nextId = 5;

const addComment = () => {
  if (newCommentText.value.trim()) {
    comments.value.push({
      id: nextId++,
      author: 'یوزر جدید',
      avatar: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
      date: 'هم اکنون',
      text: newCommentText.value,
      replies: [],
    });
    newCommentText.value = '';
  }
};
</script>

<style lang="scss">
.comment-wrapper {
  background: $light;
  padding: 40px 10px 10px;

  >.comment-form {
    display: flex;
    flex-direction: column;
  }

  .comment-textarea {

    resize: none;
    padding: 10px;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  }
}
</style>
