<script setup lang="ts">

import { watch } from 'vue';
import { notification } from 'ant-design-vue';
import { IQuestion } from '~/entities/questions/model/types.ts';
import { useNewQuizStore } from '~/feature/quiz-creator/model/newQuiz.store.ts';
import { EQuizRounds } from '~/entities/quiz/model/types.ts';

interface Props {
  selectedQuestions: IQuestion[];
  setSelectedQuestions: (_: IQuestion[]) => void;
}

const props = defineProps<Props>();
const store = useNewQuizStore();

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
  store.setCurrentRoundToFill(name);
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
      <AForm>
        <AFlex justify="space-between">
          <AFormItem
            name="name"
            label="Quiz Name"
            required
          >
            <AInput
              class="input"
            />
          </AFormItem>
          <AButton
            :disabled="!store.isFilled"
            type="primary"
          >
            Create Quiz
          </AButton>
        </AFlex>
      </AForm>
    </template>
  </AList>
</template>

<style scoped>

.container {
  max-width: 600px;
  padding: 8px;
}

.round {
  cursor: pointer;
  min-width: 250px;
}

.round-name {
  min-width: 130px;
}

.selected {
  border: 1px solid transparent;
  border-image: linear-gradient(90deg, #87d068, #108ee9) 1;
}

.input {
  max-width: 150px;
}
</style>
