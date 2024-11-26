<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import QuestionListFilter from '~/entities/questions/ui/QuestionListFilter.vue';
import QuestionList from '~/entities/questions/ui/QuestionList.vue';

import { IQuestion, IQuestionFilters } from '~/entities/questions/model/types.ts';
import QuestionCollector from '~/entities/questions/ui/QuestionCollector.vue';
import { EQueryKeys } from '~/shared/api/api-config.ts';

const filters = ref<IQuestionFilters>({});
const selectedQuestions = ref<IQuestion[]>([]);

const setSelectedQuestions = (questions: IQuestion[]) => {
  selectedQuestions.value = questions;
};

const { data: questions, isLoading, isFetching } = useQuery({
  queryKey: [EQueryKeys.Questions, filters.value],
  refetchOnWindowFocus: false,
  queryFn: async () => (await axios.get<IQuestion[]>('/questions', { params: filters.value })).data,
});

</script>

<template>
  <AFlex
    vertical
    gap="middle"
  >
    <AFlex
      gap="small"
      justify="space-between"
    >
      <QuestionListFilter :filters="filters" />
      <QuestionCollector
        :filters="filters"
        :selected-questions="selectedQuestions"
        :set-selected-questions="setSelectedQuestions"
        :all-questions="questions || []"
      />
    </AFlex>
    <QuestionList
      :questions="questions || []"
      :is-fetching="isFetching"
      :is-loading="isLoading"
      :set-selected-questions="setSelectedQuestions"
      :selected-question-keys="selectedQuestions.map((question) => question.id)"
      :filters="filters"
    />
  </AFlex>
</template>

<style>
</style>
