<script setup lang="ts">
import QuizGame from '~/entities/quiz/ui/QuizGame.vue';
import ExistingQuizGuard from '~/entities/quiz/ui/ExistingQuizGuard.vue';

</script>

<template>
  <div>
    <ExistingQuizGuard>
      <template #quizConsumer="{quiz}">
        <QuizGame :quiz="quiz" />
      </template>
    </ExistingQuizGuard>
  </div>
</template>

<style></style>
