<script setup lang="ts">
import { computed, ref } from 'vue';
import { Empty } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { EQuizSteps, QuizSteps } from '~/entities/quiz/model/quiz-game-steps.ts';
import { IQuiz } from '~/entities/quiz/model/types.ts';
import QuizGameProgress from '~/entities/quiz/ui/QuizGameProgress.vue';
import QuizGameLogic from '~/entities/quiz/ui/QuizGameLogic.vue';
import { useQuizStore } from '~/shared/store/slices/quiz.store.ts';

interface Props {
  quiz: IQuiz;
}

const props = defineProps<Props>();
const store = useQuizStore();
const currentStep = ref(EQuizSteps.NotStarted);

const { getQuizLatestAttempt } = storeToRefs(store);

const attempt = computed(() => getQuizLatestAttempt.value(props.quiz.id));

const playQuiz = () => {
  currentStep.value = EQuizSteps.InProgress;
  store.createQuizAttempt(props.quiz.id);
};

</script>

<template>
  <AFlex
    vertical
    gap="8"
  >
    <AFlex>
      <ATypographyTitle :level="3">
        Quiz: {{ quiz.name }}
      </Atypographytitle>
    </AFlex>
    <AFlex
      v-if="currentStep === EQuizSteps.InProgress"
      justify="space-between"
      gap="middle"
      class="container"
    >
      <QuizGameLogic
        v-if="attempt"
        :attempt="attempt"
        :quiz="quiz"
      />
      <QuizGameProgress :quiz="quiz" />
    </AFlex>
    <ASteps
      :current="currentStep"
      :items="QuizSteps"
    />
    <AEmpty
      v-if="currentStep === EQuizSteps.NotStarted"
      :image="Empty.PRESENTED_IMAGE_SIMPLE"
    >
      <template #description>
        You haven't played this quiz yet...
      </template>
      <AButton
        type="primary"
        @click="playQuiz"
      >
        Play
      </AButton>
    </AEmpty>
  </AFlex>
</template>

<style scoped>
.container {
  margin-bottom: auto;
  min-height: 680px;
}
</style>
