   import { defineStore } from 'pinia';

   export const useScoreStore = defineStore('score', {
     state: () => ({
       score: 0,
       correctAnswers: 0,
       wrongAnswers: 0,
     }),
     actions: {
       updateScore(score: number) {
         this.score = score;
       },
       updateCorrectAnswers(correctAnswers: number) {
         this.correctAnswers = correctAnswers;
       },
       updateWrongAnswers(wrongAnswers: number) {
         this.wrongAnswers = wrongAnswers;
       },
     },
   });