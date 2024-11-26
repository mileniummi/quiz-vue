import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { EAppRouteNames, EAppRoutes } from '~/app/router/model/constants.ts';

export const routes: RouteRecordRaw[] = [
  {
    path: EAppRoutes.Quizzes,
    name: EAppRouteNames.Quizzes,
    component: () => import('~/pages/QuizzesPage.vue'),
  },
  {
    path: EAppRoutes.CreateQuiz,
    name: EAppRouteNames.CreateQuiz,
    component: () => import('~/pages/CreateQuizPage.vue'),
  },
  {
    path: EAppRoutes.Quiz,
    name: EAppRouteNames.Quiz,
    component: () => import('~/pages/QuizPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
