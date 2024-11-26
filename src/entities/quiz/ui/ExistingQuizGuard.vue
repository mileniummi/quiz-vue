<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Empty } from 'ant-design-vue';
import { useQuizStore } from '~/shared/store/slices/quiz.store.ts';
import { IQuiz } from '~/entities/quiz/model/types.ts';

defineSlots<{ quizConsumer(props: { quiz: IQuiz }): void }>();

const route = useRoute();
const quizStore = useQuizStore();
const quizObject = quizStore.quizzes.find((quiz) => quiz.id.toString() === route.params.id);
</script>

<template>
  <slot
    v-if="quizObject"
    name="quizConsumer"
    :quiz="quizObject"
  />
  <AEmpty
    v-else
    :image="Empty.PRESENTED_IMAGE_SIMPLE"
  >
    <template #description>
      Quiz not found
    </template>
  </AEmpty>
</template>
