import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CollectQuizQuestions from '~/pages/CreateQuiz.vue';
import { EAppRoutes } from '~/app/router/model/constants.ts';

export const routes: RouteRecordRaw[] = [
  {
    path: EAppRoutes.CreateQuiz,
    name: 'Create Quiz',
    component: CollectQuizQuestions,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
