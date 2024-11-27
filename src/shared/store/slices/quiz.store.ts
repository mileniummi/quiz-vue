import { defineStore } from 'pinia';
import { IQuiz } from '~/entities/quiz/model/types.ts';
import { IQuizAttempt } from '~/entities/quiz-results/model/types.ts';

export const useQuizStore = defineStore('quizzes', {
  state: () => ({
    quizzes: [] as IQuiz[],
  }),
  actions: {
    addQuiz(quiz: IQuiz) {
      this.quizzes.push(quiz);
    },
    addQuizAttempt(quizId: number, attempt: IQuizAttempt) {
      const quiz = this.quizzes.find((q) => q.id === quizId);
      if (quiz) quiz.attempts.push(attempt);
    },
  },
  getters: {
    getQuizLatestAttempt: (state) => (quizId: number) => {
      const quiz = state.quizzes.find((q) => q.id === quizId);
      if (quiz) {
        return quiz.attempts[quiz.attempts.length - 1] as IQuizAttempt;
      }
      return undefined;
    },
  },
});
