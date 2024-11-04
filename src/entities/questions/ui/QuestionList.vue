<script setup lang="ts">

import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { EQueryKeys } from '~/api/api-config.ts';
import { IQuestion, IQuestionFilters } from '~/entities/questions/model/types.ts';
import { QuestionListTableColumns } from '~/entities/questions/model/table-columns.ts';

interface Props {
  filters: IQuestionFilters;
  selectedQuestionKeys: number[];
  setSelectedQuestions: (_: IQuestion[]) => void;
}

const props = defineProps<Props>();

const { data, isLoading, isFetching } = useQuery({
  queryKey: [EQueryKeys.Questions, props.filters],
  queryFn: async () => (await axios.get<IQuestion[]>('/questions', { params: props.filters })).data,
});

</script>

<template>
  <ATable
    :columns="QuestionListTableColumns"
    :loading="isLoading || isFetching"
    :data-source="data"
    :pagination="false"
    :row-selection="{
      onChange(_: number[], selectedRows: IQuestion[]) {
        props.setSelectedQuestions(selectedRows);
      },
      selectedRowKeys: props.selectedQuestionKeys,
      hideSelectAll: true
    }"
    row-key="id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'answers'">
        <AFlex
          gap="8"
          wrap="wrap"
        >
          <ATag
            v-for="answer in Object.values(record.answers).filter(Boolean)"
            :key="answer"
            class="tag"
            color="cyan"
          >
            {{ answer }}
          </ATag>
        </AFlex>
      </template>
    </template>
  </ATable>
</template>

<style scoped>
.tag {
  max-width: 250px;
  width: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
