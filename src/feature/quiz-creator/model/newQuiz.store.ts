import { defineStore } from 'pinia';
import {
  EQuizRounds, initiateQuiz, IQuiz, IQuizRound,
} from '~/entities/quiz/model/types.ts';
import { IQuestion } from '~/entities/questions/model/types.ts';

interface NewQuizStoreState {
    quiz: IQuiz;
    currentRoundToFill: EQuizRounds;
}

export const useNewQuizStore = defineStore('new-quiz', {
  state: (): NewQuizStoreState => ({
    quiz: initiateQuiz(),
    currentRoundToFill: EQuizRounds.WarmUp,
  }),
  actions: {
    addQuestions(questions: IQuestion[]) {
      this.quiz.rounds[this.currentRoundToFill].addQuestion(questions);
    },
    setCurrentRoundToFill(round: EQuizRounds) {
      this.currentRoundToFill = round;
    },
  },
  getters: {
    getCurrentRound(): IQuizRound {
      return this.quiz.rounds[this.currentRoundToFill];
    },
    isFilled(): boolean {
      return Object.values(this.quiz.rounds).every((round) => round.isFilled());
    },
  },
});
