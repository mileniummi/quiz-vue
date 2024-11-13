<script setup lang="ts">

import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { EQueryKeys } from '~/api/api-config.ts';
import { QuestionDifficultyOptions } from '~/entities/questions/model/constants.ts';
import { IQuestionFilters, IQuestionTagsResponse } from '~/entities/questions/model/types.ts';

interface Props {
  filters: IQuestionFilters
}

defineProps<Props>();

const { data: tags } = useQuery({
  queryKey: [EQueryKeys.QuizTags],
  refetchOnWindowFocus: false,
  queryFn: async () => (await axios.get<IQuestionTagsResponse[]>('/tags')).data,
});

const { data: categories } = useQuery({
  queryKey: [EQueryKeys.QuizCategories],
  refetchOnWindowFocus: false,
  queryFn: async () => (await axios.get<IQuestionTagsResponse[]>('/categories')).data,
});

</script>

<template>
  <AForm
    layout="vertical"
  >
    <AFlex gap="8">
      <AFormItem
        label="Difficulty"
      >
        <ASelect
          v-model:value="filters.difficulty"
          class="select"
          allow-clear
          :options="QuestionDifficultyOptions"
        />
      </AFormItem>
      <AFormItem
        label="Tags"
      >
        <ASelect
          v-model:value="filters.tags"
          allow-clear
          :options="(tags || []).map((tag) => ({value: tag.name, label: tag.name}))"
          class="select"
        />
      </AFormItem>
      <AFormItem
        label="Category"
      >
        <ASelect
          v-model:value="filters.category"
          allow-clear
          :options="(categories || []).map((c) => ({value: c.name, label: c.name}))"
          class="select"
        />
      </AFormItem>
    </AFlex>
  </AForm>
</template>

<style scoped>
.select {
  min-width: 150px;
}
</style>
