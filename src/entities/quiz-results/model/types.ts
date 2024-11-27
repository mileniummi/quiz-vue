import { EQuizRounds, QuizRound } from '~/entities/quiz/model/types.ts';

export interface IQuizRoundAnswerStats {
  totalQuestionsCount: number;
  correctAnswersCount: number;
}

export type TQuizResults = {
  [key in EQuizRounds]: IQuizRoundAnswerStats;
}

export interface IQuizAttempt {
  round: QuizRound;
  roundEnded: boolean;
  attemptFinished: boolean;
  questionNumber: number;
  startedAt: Date;
  results: TQuizResults;
}
