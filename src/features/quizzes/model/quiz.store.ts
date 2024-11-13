import { defineStore } from 'pinia';
import { IQuiz } from '~/entities/quiz/model/types.ts';

export const useQuizStore = defineStore('quizzes', {
  state: () => ({
    quizzes: [] as IQuiz[],
  }),
  actions: {
    addQuiz(quiz: IQuiz) {
      this.quizzes.push(quiz);
    },
  },
});
