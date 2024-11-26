export enum EAppRoutes {
  Quizzes = '/',
  CreateQuiz = '/create-quiz',
  Quiz = '/quiz/:id',
}

export enum EAppRouteNames {
  Quizzes = 'Quizzes',
  CreateQuiz = 'Create Quiz',
  Quiz = 'Quiz',
}

export const MenuDisplayedRoutes = [EAppRoutes.Quizzes, EAppRoutes.CreateQuiz];
