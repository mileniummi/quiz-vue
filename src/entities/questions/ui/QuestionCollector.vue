<script setup lang="ts">

import { ref, watch } from 'vue';
import { notification } from 'ant-design-vue';
import { useQueryClient } from '@tanstack/vue-query';
import { IQuestion, IQuestionFilters } from '~/entities/questions/model/types.ts';
import { useNewQuizStore } from '~/shared/store/slices/new-quiz.store.ts';
import { EQuizRounds } from '~/entities/quiz/model/types.ts';
import { EQueryKeys } from '~/shared/api/api-config.ts';
import { useQuizStore } from '~/shared/store/slices/quiz.store.ts';
import router from '~/app/router/model/router.ts';
import { EAppRoutes } from '~/app/router/model/constants.ts';

interface Props {
  selectedQuestions: IQuestion[];
  setSelectedQuestions: (_: IQuestion[]) => void;
  filters: IQuestionFilters;
  allQuestions: IQuestion[];
}

const props = defineProps<Props>();
const store = useNewQuizStore();
const quizStore = useQuizStore();
const queryClient = useQueryClient();
const formState = ref<{ quizName: string }>({ quizName: '' });

watch(() => props.selectedQuestions, () => {
  try {
    store.addQuestions(props.selectedQuestions);
  } catch {
    notification.warn({
      message: 'This round is already filled',
      description: 'Please choose another round',
      placement: 'topRight',
    });
  }
});

const setCurrentRoundToFill = (name: EQuizRounds) => {
  props.setSelectedQuestions([]);
  queryClient.invalidateQueries({ queryKey: [EQueryKeys.Questions] });
  store.setCurrentRoundToFill(name);
};

const setRandomQuestions = () => {
  const questionCountToSelect = store.getCurrentRound.questionsCount
    - store.getCurrentRound.questions.length;

  const randomQuestions = props.allQuestions
    .filter((question) => !store.getCurrentRound.questions.some((q) => q.id === question.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, questionCountToSelect).filter(Boolean);

  props.setSelectedQuestions(props.selectedQuestions.concat(randomQuestions));
};

const createQuiz = () => {
  quizStore.addQuiz({ ...store.quiz, name: formState.value.quizName });
  store.reset();
  router.push({ path: EAppRoutes.Quizzes });
};

</script>

<template>
  <AList
    size="small"
    bordered
  >
    <template #header>
      <ATypography>Quiz Rounds</ATypography>
    </template>
    <AFlex
      gap="small"
      wrap="wrap"
      class="container"
    >
      <AListItem
        v-for="round in store.quiz.rounds"
        :key="round.name"
        :class="{ 'selected': store.currentRoundToFill === round.name }"
        @click="setCurrentRoundToFill(round.name)"
      >
        <AFlex class="round">
          <AFlex
            class="round-name"
            gap="small"
          >
            <ATypography>{{ round.name }}</ATypography>
            <ATypography>{{ round.questions.length }} / {{ round.questionsCount }}</ATypography>
          </AFlex>
          <AProgress
            size="small"
            :percent="Math.round( round.questions.length / round.questionsCount * 100)"
            :stroke-color="{
              '0%': '#108ee9',
              '100%': '#87d068',
            }"
          />
        </AFlex>
      </AListItem>
    </AFlex>
    <template #footer>
      <AForm
        :model="formState"
        @finish="createQuiz"
      >
        <AFlex justify="space-between">
          <AFormItem
            name="quizName"
            label="Quiz Name"
            :rules="[{required: true, message: 'Please input quiz name'}]"
          >
            <AInput
              v-model:value="formState.quizName"
              class="input"
            />
          </AFormItem>
          <AFlex gap="8">
            <AButton
              type="primary"
              :disabled="!(store.getCurrentRound.questions.length
                < store.getCurrentRound.questionsCount)"
              @click="setRandomQuestions"
            >
              Random
            </AButton>
            <AButton
              :disabled="!store.isFilled"
              type="primary"
              html-type="submit"
            >
              Create Quiz
            </AButton>
          </AFlex>
        </AFlex>
      </AForm>
    </template>
  </AList>
</template>

<style scoped>

.container {
  max-width: 610px;
  padding: 8px;
}

.round {
  cursor: pointer;
  min-width: 260px;
}

.round-name {
  min-width: 140px;
}

.selected {
  border: 1px solid transparent;
  border-image: linear-gradient(90deg, #87d068, #108ee9) 1;
}

.selected:last-child {
  border-block-end: 1px solid transparent;
}

.input {
  max-width: 150px;
}
</style>
