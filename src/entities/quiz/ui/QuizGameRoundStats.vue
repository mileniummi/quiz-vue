<script setup lang="ts">
import { IQuizAttempt } from '~/entities/quiz-results/model/types.ts';
import { useQuizAttemptStore } from '~/shared/store/slices/quiz-attempt.store.ts';
import { useQuizStore } from '~/shared/store/slices/quiz.store.ts';
import { EQuizSteps } from '~/entities/quiz/model/quiz-game-steps.ts';

interface IProps {
  quizId: number;
  attempt: IQuizAttempt;
  changeQuizStep: (step: EQuizSteps) => void;
}

const props = defineProps<IProps>();
const quizStore = useQuizStore();
const store = useQuizAttemptStore();

const finishQuiz = () => {
  store.setNextRound();
  store.removeAttempt();
  quizStore.addQuizAttempt(props.quizId, props.attempt);
  props.changeQuizStep(EQuizSteps.WatchingResults);
};

</script>

<template>
  <AFlex
    style="width: 100%;"
    justify="center"
  >
    <AFlex
      vertical
      gap="middle"
      justify="center"
      align="center"
    >
      <ATypographyTitle :level="4">
        Round {{ attempt.round.name }} has ended.
      </ATypographyTitle>
      <AStatistic
        title="Correct Answers"
        :value="attempt.results[attempt.round.name].correctAnswersCount"
        :suffix="'/' + attempt.results[attempt.round.name].totalQuestionsCount"
      />
      <AButton
        v-if="!attempt.round.isLastRound()"
        type="primary"
        @click="store.setNextRound()"
      >
        Start Next Round
      </AButton>
      <AButton
        v-else
        type="primary"
        @click="finishQuiz"
      >
        Finish Quiz
      </AButton>
    </AFlex>
  </AFlex>
</template>

<style>
</style>
