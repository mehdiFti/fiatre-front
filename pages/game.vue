<template>
  <div class="container">
    <main class="quiz-container">
      <div class="quiz-wrapper">
        <div class="timer-display">
          <!-- {{ timeLeft }} -->
        </div>
        <transition name="fade">
          <div class="question-display" key="questions[currentQuestion].image">
            <img class="quiz-image" :src="questions[currentQuestion].image" :alt="questions[currentQuestion].question">
            <!-- <p class="quiz-text">{{ questions[currentQuestion].question }}</p> -->
          </div>
        </transition>
        <div class="choices-display">
          <button
            v-for="(choice, index) in questions[currentQuestion].choices"
            :key="choice.id"
            class="quiz-button"
            :class="{
              correct: selectedChoice === index && isCorrectChoice(index),
              wrong: selectedChoice === index && !isCorrectChoice(index)
            }"
            @click="handleChoice(questions[currentQuestion].id, choice.id)"
            :disabled="isDisabled"
          >
            {{ choice.text }}
          </button>
        </div>
        <div class="score-display">
          <!-- {{ score }} امتیاز -->
        </div>
      </div>
    </main>
    <!-- <section class="result-container">
      <h2>بازی به پایان رسید!</h2>
      <p>برای مشاهده امتیازات به صفحه امتیازات  فیاتر بروید</p>
      <nuxt-link class="profile-btn" to="/profile">صفحه امتیازات</nuxt-link>
    </section> -->
  </div>
</template>
  <script setup lang="ts">

definePageMeta({
  middleware: [() => {
  },'redirect-to-login']
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

  // const hasPlayed = ref(false);
  const currentQuestion = ref(0);
  const selectedChoice = ref(-1);
  const timeLeft = ref(10);
  const gameFinished = ref(false);
  // const score = ref(0);

  const isDisabled = computed(() => {
    return selectedChoice.value !== -1 || timeLeft.value <= 0;
  })

  
  const getQuestionsRequest = await useAuthFetch<any>('/api/games/', {});

  const postChoiceRequest = useAuthFetch('/api/games/choices/', {
      method: 'POST',
      immediate: false,
      watch: false,
      // body: {
      //   text: selectedChoice,
      //   is_choice: index === currentQuestionData.correctChoice,
      //   game: getQuestionsRequest.data.value.results[currentQuestion.value].id
      // }
    });

  const questions = computed(() => {
    if (getQuestionsRequest.status.value === 'success') {
      return getQuestionsRequest.data.value.results;
    }
    return [];
  });

  let interval: NodeJS.Timeout; // Declare interval outside to manage it

  const startTimer = () => {
    clearInterval(interval); // Clear any existing interval
    interval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value -= 1
      } else {
        clearInterval(interval);
      }
    }, 1000)
  }
  
  // Move to the next z
  const nextQuestion = async () => {
    if (currentQuestion.value < questions.value.length - 1) {
      currentQuestion.value += 1;
      selectedChoice.value = -1;
      timeLeft.value = 10
      await nextTick(); // Wait for the DOM to update
      startTimer(); // Start the timer after the DOM update
    } else {
      gameFinished.value = true 
    }
  }
  
  // Handle choice selection
  const handleChoice = async (questionId: number, choiceId: number) => {
    if (isDisabled.value) return;

    selectedChoice.value = choiceId;

    await postChoiceRequest.execute();
    // if (selectedChoice.value !== -1) return;
    // selectedChoice.value = index;
    
    // // clearInterval(interval);

    // const currentQuestionData = questions.value[currentQuestion.value];
    // const selectedChoice = currentQuestionData.choices[index];

    // try {
    
      
    //   if (index === currentQuestionData.correctChoice) {
    //     // score.value += 1;
    //   }
    // } catch (error) {
    //   console.error('Error submitting choice:', error);
    // }
    
    // setTimeout(nextQuestion, 1000);
  }
  
  const isCorrectChoice = (index: number) => {
    return index === questions.value[currentQuestion.value].correctChoice
  }
  
  
  // onMounted(() => {
  //   if (!hasPlayed.value) {
  //     startTimer();
  //     hasPlayed.value = true;
  //   }
  // })
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