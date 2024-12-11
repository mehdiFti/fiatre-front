<template>
  <div class="container">
    <main class="quiz-container" v-if="!gameFinished">
      <div class="quiz-wrapper">
        <div class="timer-display">
          {{ timeLeft }}
        </div>
        <transition name="fade">
          <div class="question-display" key="questions[currentQuestion].image">
            <nuxt-img class="quiz-image" :src="questions[currentQuestion].image" :alt="questions[currentQuestion].question"></nuxt-img>
            <!-- <p class="quiz-text">{{ questions[currentQuestion].question }}</p> -->
          </div>
        </transition>
        <div class="answers-display">
          <button
            v-for="(answer, index) in questions[currentQuestion].answers"
            :key="index"
            class="quiz-button"
            :class="{
              correct: selectedAnswer === index && isCorrectAnswer(index),
              wrong: selectedAnswer === index && !isCorrectAnswer(index)
            }"
            @click="handleAnswer(index)"
            :disabled="selectedAnswer !== -1"
          >
            {{ answer }}
          </button>
        </div>
        <div class="score-display">
          {{ score }} امتیاز
        </div>
      </div>
    </main>
    <section v-else class="result-container">
      <h2>بازی به پایان رسید!</h2>
      <p>برای مشاهده امتیازات به صفحه امتیازات  فیاتر بروید</p>
      <nuxt-link class="profile-btn" to="/profile">صفحه امتیازات</nuxt-link>
    </section>
  </div>
</template>
  <script setup lang="ts">

definePageMeta({
  middleware: ['redirect-to-login']
})  

 useSeoMeta({
  title: 'بازی کوییز',
  description: 'صفحه بازی کوییز برای تست دانش شما در مورد فیلم‌ها و سریال‌ها.',
  keywords: 'بازی, کوییز, فیلم, سریال, تست دانش',
  ogTitle: 'بازی کوییز',
  ogDescription: 'صفحه بازی کوییز برای تست دانش شما در مورد فیلم‌ها و سریال‌ها.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/game',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow'
});



  import { ref, computed, onMounted, nextTick } from 'vue'
  import { useScoreStore } from '~/stores/scoreStore'; 
  const scoreStore = useScoreStore();
  const hasPlayed = ref(false);

  const score = ref(0)
  const timeLeft = ref(10)
  const currentQuestion = ref(0)
  const selectedAnswer = ref(-1)
  const gameFinished = ref(false) 

  // Fetch questions from the API using useAuthFetch
  const getQuestionsRequest = await useAuthFetch<any>('/api/games/', {});
  console.log(getQuestionsRequest.data.value);

  const questions = computed(() => {
    if (getQuestionsRequest.status.value === 'success') {
      return getQuestionsRequest.data.value.results.map((game) => ({
        image: game.image,
        question: game.title,
        answers: game.choices.map(choice => choice.text),
        correctAnswer: game.choices.findIndex(choice => choice.is_answer)
      }));
    }
    return [];
  });

  let interval; // Declare interval outside to manage it

  const startTimer = () => {
    clearInterval(interval); // Clear any existing interval
    interval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value -= 1
      } else {
        nextQuestion()
      }
    }, 1000)
  }
  
  // Move to the next question
  const nextQuestion = async () => {
    if (currentQuestion.value < questions.value.length - 1) {
      currentQuestion.value += 1
      selectedAnswer.value = -1
      timeLeft.value = 10
      await nextTick(); // Wait for the DOM to update
      startTimer(); // Start the timer after the DOM update
    } else {
      gameFinished.value = true 
    }
  }
  
  // Handle answer selection
  const handleAnswer = (index: number) => {
    if (selectedAnswer.value !== -1) return;
    selectedAnswer.value = index;
    
    // Stop the timer when an answer is selected
    clearInterval(interval);

    if (index === questions.value[currentQuestion.value].correctAnswer) {
        score.value += 5;
        scoreStore.updateCorrectAnswers(scoreStore.correctAnswers + 1);
    } else {
        scoreStore.updateWrongAnswers(scoreStore.wrongAnswers + 1);
    }
    scoreStore.updateScore(score.value); // Update score
    setTimeout(nextQuestion, 1000);
  }
  
  const isCorrectAnswer = (index: number) => {
    return index === questions.value[currentQuestion.value].correctAnswer
  }
  
  
  onMounted(() => {
    if (!hasPlayed.value) {
      startTimer();
      hasPlayed.value = true;
    }
  })
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
  
    .answers-display {
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