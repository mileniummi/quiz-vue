import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { EAppRoutes } from '~/app/router/model/constants.ts';

export const routes: RouteRecordRaw[] = [
  {
    path: EAppRoutes.Quizzes,
    name: 'Quizzes',
    component: () => import('~/pages/QuizzesPage.vue'),
  },
  {
    path: EAppRoutes.CreateQuiz,
    name: 'Create Quiz',
    component: () => import('~/pages/CreateQuizPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
