import { StepsProps } from 'ant-design-vue';

export enum EQuizSteps {
  NotStarted,
  InProgress,
  WatchingResults,
}

export const QuizSteps: StepsProps['items'] = [
  {
    title: 'Not started',
    description: 'You can start the quiz at any time',
  },
  {
    title: 'In progress',
    description: 'You are in the middle of the quiz',
  },
  {
    title: 'Watching results',
  },
];
