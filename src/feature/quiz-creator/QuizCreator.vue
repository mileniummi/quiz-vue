<script setup lang="ts">
import { computed, ref } from 'vue';
import QuestionListFilter from '~/entities/questions/ui/QuestionListFilter.vue';
import QuestionList from '~/entities/questions/ui/QuestionList.vue';

import { IQuestion, IQuestionFilters } from '~/entities/questions/model/types.ts';
import QuestionCollector from '~/entities/questions/ui/QuestionCollector.vue';

const filters = ref<IQuestionFilters>({});
const selectedQuestions = ref<IQuestion[]>([]);

const setSelectedQuestions = (questions: IQuestion[]) => {
  selectedQuestions.value = questions;
};

const selectedQuestionsKeys = computed(
  () => selectedQuestions.value.map((question) => question.id),
);

</script>

<template>
  <AFlex
    gap="small"
    justify="space-between"
  >
    <QuestionListFilter :filters="filters" />
    <QuestionCollector
      :selected-questions="selectedQuestions"
      :set-selected-questions="setSelectedQuestions"
    />
  </AFlex>
  <QuestionList
    :set-selected-questions="setSelectedQuestions"
    :selected-question-keys="selectedQuestionsKeys"
    :filters="filters"
  />
</template>

<style>
</style>
