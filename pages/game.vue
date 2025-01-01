<template>
  <div class="container">
    <main class="quiz-container">
      <!-- Loading State -->
      <div v-if="activeGameRequest.status.value === 'pending'">
        loading game
      </div>

      <!-- Active Game State -->
      <div v-else-if="hasActiveGame" class="quiz-wrapper">
        <div class="timer-display">
          {{ timeLeft }}
        </div>

        <transition name="fade">
          <div class="question-display">
            <img class="quiz-image" :src="getImageUrl(activeGame.image)">
          </div>
        </transition>

        <div class="choices-display">
          <button
            v-for="choice in activeGame.choices"
            :key="choice.id"
            class="quiz-button"
            :class="{
              'wrong': opportunityEnded && selectedChoiceId === choice.id && !choice.is_answer,
              'correct': opportunityEnded && choice.is_answer,
            }"
            :disabled="isChoicesDisabled"
            @click="selectAnswer(choice.id)"
          >
            {{ choice.text }}
          </button>
        </div>

        <div class="score-display">
          <button
            class="profile-btn"
            style="display: none;"
            :disabled="!opportunityEnded || activeGameRequest.status.value === 'pending'"
            @click="getNextQuestion"
          >
            سوال بعدی
          </button>
        </div>
      </div>

      <!-- No Active Game State -->
      <div v-else class="result-container">
        <h2>بازی به پایان رسید!</h2>
        <p>برای مشاهده امتیازات به صفحه امتیازات فیاتر بروید</p>
        <nuxt-link class="profile-btn" to="/profile">صفحه امتیازات</nuxt-link>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">

definePageMeta({
  middleware: [() => {
  }, 'redirect-to-login'],
});

useSeoMeta({
  title: 'بازی کوییز',
  description: 'صفحه بازی کوییز برای تست دانش شما در مورد فیلم‌ها و سریال‌ها.',
  keywords: 'بازی, کوییز, فیلم, سریال, تست دانش',
  ogTitle: 'بازی کوییز',
  ogDescription: 'صفحه بازی کوییز برای تست دانش شما در مورد فیلم‌ها و سریال‌ها.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/game',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
});

const DEFAULT_TIME_LEFT = 10;

const selectedChoiceId = ref<number | undefined>(undefined);
const opportunityEnded = ref(false);
const timer = ref<NodeJS.Timeout>();
const timeLeft = ref(DEFAULT_TIME_LEFT);

const getNextQuestion = async () => {
  await activeGameRequest.execute();

  if (!hasActiveGame.value) {
    return;
  }

  timeLeft.value = DEFAULT_TIME_LEFT;
  selectedChoiceId.value = undefined;
  opportunityEnded.value = false;

  timer.value = setInterval(async () => {
    timeLeft.value--;

    if (timeLeft.value <= 0) {
      clearInterval(timer.value);
      opportunityEnded.value = true;

      await answerGameRequest.execute();
      await getNextQuestion();
    }
  }, 1000);
};

const activeGameRequest = useAuthFetch<any>('/api/games/active/games/', {
  immediate: false,
  watch: false,
});

const hasActiveGame = computed(() => {
  if (activeGameRequest.data.value) {
    return Object.keys(activeGameRequest.data.value).length;
  }

  return false;
});

const answerGameRequestBody = computed(() => {
  return {
    game: activeGame.value.id,
    answer: selectedChoiceId.value,
  };
});

const activeGame = computed(() => {
  return activeGameRequest.data.value;
});

const isChoicesDisabled = computed(() => {
  return typeof selectedChoiceId.value === 'number' || opportunityEnded.value;
});

const getImageUrl = (imageUrl: string) => {
  if (!imageUrl) {
    return '';
  }

  return `https://www.fiatre.ir${imageUrl}`;
};

const selectAnswer = async (choiceId: number) => {
  clearInterval(timer.value);
  selectedChoiceId.value = choiceId;
  opportunityEnded.value = true;

  await answerGameRequest.execute();
  await getNextQuestion();
};

const answerGameRequest = useAuthFetch<any>('/api/games/user-games/', {
  immediate: false,
  watch: false,
  method: 'post',
  body: answerGameRequestBody,
});

onMounted(() => {
  getNextQuestion();
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});


</script>

  <style scoped lang="scss">
  .quiz-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px;

    .quiz-wrapper {
      border-radius: 10px;
      display: flex;
      width: 400px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: linear-gradient(135deg, $dark, $gray-300);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .score-display {
      font-size: 24px;
      background-color: $primary;
      color: $white;
      border-radius: 5px;
      width: 100%;
      text-align: center;
      margin-top: 30px;
    }

    .timer-display {
      font-size: 20px;
      background-color: $third;
      border-radius: 50px;
      color: $white;
      width: 50px;
      height: 50px;
      animation: pulse 1s infinite;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .question-display {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;

      .quiz-image {
        width: 360px;
        height: 220px;
        object-fit: cover;
        margin-bottom: 10px;
        border-radius: 5px;
      }

      .quiz-text {
        font-size: 18px;
        text-align: center;
        max-width: 300px;
      }
    }

    .choices-display {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;

      .quiz-button {
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        border: 1px solid $gray-400;
        border-radius: 5px;
        transition: background-color 0.3s ease, transform 0.3s ease;
        text-align: center;
        width: 100%;
        height: 50px;
        white-space: nowrap;

        &.correct {
          background-color: green;
          color: white;
        }

        &.wrong {
          background-color: red;
          color: $white;
        }
      }
    }
  }

  .result-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 40px;

    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    p {
      font-size: 20px;
      margin-bottom: 20px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background-color: $primary;
      color: $white;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: darken($primary, 10);
      }
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .profile-btn {
    display: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: $primary;
    color: $white;
    transition: background-color 0.3s ease, transform 0.3s ease;
    text-decoration: none;
    display: inline-block;
    text-align: center;

    &:hover {
      background-color: darken($primary, 10%);
      transform: scale(1.05);
    }
  }
  </style>

