<script setup lang="ts">
import { ref } from 'vue';
import { Empty } from 'ant-design-vue';
import { EQuizSteps, QuizSteps } from '~/entities/quiz/model/quiz-game-steps.ts';
import { IQuiz } from '~/entities/quiz/model/types.ts';
import QuizGameProgress from '~/entities/quiz/ui/QuizGameProgress.vue';
import QuizGameLogic from '~/entities/quiz/ui/QuizGameLogic.vue';
import { useQuizAttemptStore } from '~/shared/store/slices/quiz-attempt.store.ts';
import QuizAttemptStats from '~/entities/quiz-results/ui/QuizAttemptStats.vue';

interface Props {
  quiz: IQuiz;
}

const props = defineProps<Props>();
const store = useQuizAttemptStore();
const currentStep = ref(
  props.quiz.attempts.length > 0 ? EQuizSteps.WatchingResults : EQuizSteps.NotStarted,
);

const playQuiz = () => {
  currentStep.value = EQuizSteps.InProgress;
  store.initiateQuizAttempt();
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
        v-if="store.attempt"
        :attempt="store.attempt"
        :change-quiz-step="step => currentStep = step"
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
    <QuizAttemptStats
      v-if="currentStep === EQuizSteps.WatchingResults"
      :play-again="playQuiz"
      :attempts="quiz.attempts"
    />
  </AFlex>
</template>

<style scoped>
.container {
  margin-bottom: auto;
  min-height: 680px;
}
</style>
