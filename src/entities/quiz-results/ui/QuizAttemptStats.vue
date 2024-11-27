<script setup lang="ts">
import { IQuizAttempt } from '~/entities/quiz-results/model/types.ts';

interface IProps {
  attempts: IQuizAttempt[];
  playAgain: () => void;
}

defineProps<IProps>();

</script>

<template>
  <AFlex
    vertical
    gap="middle"
  >
    <AFlex justify="end">
      <AButton
        type="primary"
        @click="playAgain"
      >
        Play Again
      </AButton>
    </AFlex>
    <AList
      v-for="attempt in attempts"
      :key="attempt.startedAt"
      size="small"
      bordered
    >
      <template #header>
        <ATypographyTitle
          style="text-align: left"
          :level="5"
        >
          Attempt at {{ attempt.startedAt.toLocaleTimeString() }}
          {{ attempt.startedAt.toLocaleDateString() }}
        </ATypographyTitle>
      </template>
      <AFlex
        vertical
        gap="small"
      >
        <AListItem
          v-for="[round, result] in Object.entries(attempt.results)"
          :key="round"
        >
          <AFlex
            gap="middle"
            justify="space-between"
          >
            <ATypographyParagraph style="width: 100%;">
              {{ round }}
            </ATypographyParagraph>
            <AProgress
              :percent="Math.round(result.correctAnswersCount / result.totalQuestionsCount * 100)"
              :steps="result.totalQuestionsCount"
            />
          </AFlex>
        </AListItem>
      </AFlex>
    </AList>
  </AFlex>
</template>
