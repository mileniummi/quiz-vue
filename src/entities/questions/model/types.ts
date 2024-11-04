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

export interface IQuestionCorrectAnswers {
  answer_a_correct: boolean;
  answer_b_correct: boolean;
  answer_c_correct: boolean;
  answer_d_correct: boolean;
  answer_e_correct: boolean;
  answer_f_correct: boolean;

}

export interface IQuestion {
  id: number;
  question: string;
  correct_answer: string;
  multiple_correct_answers: boolean;
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
