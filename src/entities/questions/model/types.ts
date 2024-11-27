import { EApiBooleanValue } from '~/shared/api/api-config.ts';

export enum EQuestionDifficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export interface IQuestionAnswer {
  answer_a: string;
  answer_b: string;
  answer_c: string | null;
  answer_d: string | null;
  answer_e: string | null;
  answer_f: string | null;
}

export type TQuestionAnswer =
  'answer_a'
  | 'answer_b'
  | 'answer_c'
  | 'answer_d'
  | 'answer_e'
  | 'answer_f';

export interface IQuestionCorrectAnswers {
  answer_a_correct: EApiBooleanValue;
  answer_b_correct: EApiBooleanValue;
  answer_c_correct: EApiBooleanValue;
  answer_d_correct: EApiBooleanValue;
  answer_e_correct: EApiBooleanValue;
  answer_f_correct: EApiBooleanValue;

}

export interface IQuestion {
  id: number;
  question: string;
  correct_answer: string;
  multiple_correct_answers: EApiBooleanValue;
  description: string | null;
  explanation: string | null;
  tip: string | null;
  category: string;
  difficulty: EQuestionDifficulty;
  answers: IQuestionAnswer;
  correct_answers: IQuestionCorrectAnswers;
}

export interface IQuestionTagsResponse {
  id: number;
  name: string;
}

export interface IQuestionFilters {
  difficulty?: EQuestionDifficulty;
  tags?: string[];
  category?: string[];
}
