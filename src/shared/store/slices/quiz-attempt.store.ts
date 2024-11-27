import { defineStore } from 'pinia';
import { IQuizAttempt, TQuizResults } from '~/entities/quiz-results/model/types.ts';
import { EQuizRounds, WarmUpQuizRound } from '~/entities/quiz/model/types.ts';

export interface IQuizAttemptState {
  attempt: IQuizAttempt | null;
}

const initiateQuizAttempt = (): IQuizAttempt => ({
  round: new WarmUpQuizRound(),
  roundEnded: false,
  attemptFinished: false,
  questionNumber: 0,
  startedAt: new Date(),
  results: Object.values(EQuizRounds).reduce((acc, value) => ({
    ...acc,
    [value]: { totalQuestionsCount: 0, correctAnswersCount: 0 },
  }), {} as TQuizResults),
});

export const useQuizAttemptStore = defineStore('quiz-attempt', {
  state: (): IQuizAttemptState => ({
    attempt: null,
  }),
  actions: {
    removeAttempt() {
      this.attempt = null;
    },
    initiateQuizAttempt() {
      this.attempt = initiateQuizAttempt();
    },
    submitCorrectAnswer() {
      if (!this.attempt) return;
      this.setNextQuestion();
      this.attempt.results[this.attempt.round.name].correctAnswersCount += 1;
      this.attempt.results[this.attempt.round.name].totalQuestionsCount += 1;
    },
    submitWrongAnswer() {
      if (!this.attempt) return;
      this.setNextQuestion();
      this.attempt.results[this.attempt.round.name].totalQuestionsCount += 1;
    },
    setNextQuestion() {
      if (!this.attempt) return;
      if (this.attempt.round.questionsCount - 1 === this.attempt.questionNumber) {
        this.attempt.roundEnded = true;
      } else {
        this.attempt.questionNumber += 1;
      }
    },
    setNextRound() {
      if (!this.attempt || !this.attempt.roundEnded) return;
      const newRound = this.attempt.round.getNextRound();
      if (!newRound) this.attempt.attemptFinished = true;
      else {
        this.attempt.round = newRound;
        this.attempt.roundEnded = false;
        this.attempt.questionNumber = 0;
      }
    },
  },
});
