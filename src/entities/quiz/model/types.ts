// eslint-disable-next-line max-classes-per-file
import { IQuestion } from '~/entities/questions/model/types.ts';
import { uniqueId } from '~/shared/constants/id.ts';
import { IQuizAttempt } from '~/entities/quiz-results/model/types.ts';

export enum EQuizRounds {
    WarmUp = 'Warm up',
    Logic = 'Logic',
    Shazam = 'Shazam',
    MovieMaker = 'Movie maker',
    Hardcore = 'Hardcore',
    LastChance = 'Last chance'
}

export interface IQuizRound {
    name: EQuizRounds;
    questions: IQuestion[];
    questionsCount: number;
    timePerQuestion: number;
}

export class QuizRound implements IQuizRound {
  name = EQuizRounds.WarmUp;

  questions: IQuestion[] = [];

  questionsCount = 5;

  timePerQuestion = 30;

  public addQuestion(questions: IQuestion[]) {
    const questionsToAdd = questions.filter((q) => !this.questions.some((q2) => q.id === q2.id));
    if (questionsToAdd.length + this.questions.length > this.questionsCount) {
      throw new Error(`Cannot add more than ${this.questionsCount} questions to the quiz round ${this.name}`);
    }
    this.questions = [...this.questions, ...questionsToAdd];
  }

  public isFilled() {
    return this.questions.length === this.questionsCount;
  }

  public getRoundDuration() {
    return this.questionsCount * this.timePerQuestion;
  }
}

export interface IQuiz {
    name: string | null;
    id: number;
    rounds: { [key in EQuizRounds]: QuizRound }
    attempts: IQuizAttempt[];
}

export class WarmUpQuizRound extends QuizRound {
}

export class LogicQuizRound extends QuizRound {
  name = EQuizRounds.Logic;

  questionsCount = 7;

  timePerQuestion = 120;
}

export class ShazamQuizRound extends QuizRound {
  name = EQuizRounds.Shazam;

  questionsCount = 10;

  timePerQuestion = 30;
}

export class MovieMakerQuizRound extends QuizRound {
  name = EQuizRounds.MovieMaker;

  questionsCount = 10;

  timePerQuestion = 40;
}

export class HardCoreQuizRound extends QuizRound {
  name = EQuizRounds.Hardcore;

  questionsCount = 6;

  timePerQuestion = 30;
}

export class LastChanceQuizRound extends QuizRound {
  name = EQuizRounds.LastChance;

  questionsCount = 5;

  timePerQuestion = 20;
}

export const initiateQuiz = (): IQuiz => ({
  name: 'My Quiz',
  id: uniqueId.next().value as number,
  rounds: {
    [EQuizRounds.WarmUp]: new WarmUpQuizRound(),
    [EQuizRounds.Logic]: new LogicQuizRound(),
    [EQuizRounds.Shazam]: new ShazamQuizRound(),
    [EQuizRounds.MovieMaker]: new MovieMakerQuizRound(),
    [EQuizRounds.Hardcore]: new HardCoreQuizRound(),
    [EQuizRounds.LastChance]: new LastChanceQuizRound(),
  },
  attempts: [],
});
