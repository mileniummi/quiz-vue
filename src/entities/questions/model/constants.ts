import { EQuestionDifficulty } from '~/entities/questions/model/types.ts';

export const QuestionDifficultyOptions = Object.values(EQuestionDifficulty).map((difficulty) => ({
  value: difficulty,
  label: difficulty,
}));
