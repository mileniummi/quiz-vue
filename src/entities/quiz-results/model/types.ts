import { EQuizRounds } from '~/entities/quiz/model/types.ts';

export interface IQuizRoundAnswerStats {
  totalQuestionsCount: number;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
}

export type TQuizResults = {
  [key in EQuizRounds]: IQuizRoundAnswerStats;
}

export interface IQuizAttempt {
  round: EQuizRounds;
  questionNumber: number;
  results: Partial<TQuizResults>
}
