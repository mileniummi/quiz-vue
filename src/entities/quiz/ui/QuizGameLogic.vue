<script setup lang="ts">
import { IQuiz } from '~/entities/quiz/model/types.ts';
import { IQuizAttempt } from '~/entities/quiz-results/model/types.ts';
import QuizRoundStats from '~/entities/quiz/ui/QuizGameRoundStats.vue';
import QuizGameQuestion from '~/entities/quiz/ui/QuizGameQuestion.vue';
import { EQuizSteps } from '~/entities/quiz/model/quiz-game-steps.ts';

interface Props {
  quiz: IQuiz;
  attempt: IQuizAttempt;
  changeQuizStep: (step: EQuizSteps) => void;
}

defineProps<Props>();

</script>
<template>
  <QuizRoundStats
    v-if="attempt.roundEnded"
    :attempt="attempt"
    :quiz-id="quiz.id"
    :change-quiz-step="changeQuizStep"
  />
  <QuizGameQuestion
    v-else
    :quiz="quiz"
    :attempt="attempt"
  />
</template>
