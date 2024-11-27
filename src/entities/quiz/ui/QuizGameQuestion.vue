<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuizAttemptStore } from '~/shared/store/slices/quiz-attempt.store.ts';
import { TQuestionAnswer } from '~/entities/questions/model/types.ts';
import { EApiBooleanValue } from '~/shared/api/api-config.ts';
import { IQuiz } from '~/entities/quiz/model/types.ts';
import { IQuizAttempt } from '~/entities/quiz-results/model/types.ts';

interface Props {
  quiz: IQuiz;
  attempt: IQuizAttempt;
}

const props = defineProps<Props>();

const store = useQuizAttemptStore();
const response = ref<TQuestionAnswer>();
const multipleResponse = ref<TQuestionAnswer[]>([]);

const currentRound = computed(() => props.quiz.rounds[props.attempt.round.name]);
const question = computed(() => currentRound.value.questions[props.attempt.questionNumber]);
const isMultiple = computed(
  () => question.value.multiple_correct_answers === EApiBooleanValue.True,
);
const deadline = ref<number>(Date.now() + currentRound.value.timePerQuestion * 1000);

const handleSubmit = () => {
  let answerIsCorrect = false;
  if (isMultiple.value) {
    answerIsCorrect = multipleResponse.value.every((res) => question.value.correct_answers[`${res}_correct`] === EApiBooleanValue.True);
  } else if (response.value) {
    answerIsCorrect = question.value.correct_answers[`${response.value}_correct`] === EApiBooleanValue.True;
  }

  response.value = undefined;
  multipleResponse.value = [];
  deadline.value = Date.now() + currentRound.value.timePerQuestion * 1000;
  if (answerIsCorrect) store.submitCorrectAnswer();
  else store.submitWrongAnswer();
};

</script>

<template>
  <AFlex
    vertical
    style="width: 100%"
  >
    <ACard>
      <template #title>
        <AFlex
          justify="space-between"
          align="baseline"
          gap="middle"
        >
          <ATypographyParagraph>
            Question: {{ question.question }}
          </ATypographyParagraph>
          <AStatisticCountdown
            format="mm:ss"
            :value="deadline"
            @finish="handleSubmit"
          />
        </AFlex>
      </template>
      <ACheckboxGroup
        v-if="isMultiple"
        v-model:value="multipleResponse"
      >
        <ACheckbox
          v-for="[key, answer] in Object.entries(question.answers).filter(([, a]) => Boolean(a))"
          :key="key"
          :value="key"
        >
          {{ answer }}
        </ACheckbox>
      </ACheckboxGroup>
      <ARadioGroup
        v-else
        v-model:value="response"
      >
        <ARadio
          v-for="[key, answer] in Object.entries(question.answers).filter(([, a]) => Boolean(a))"
          :key="key"
          :value="key"
        >
          {{ answer }}
        </ARadio>
      </ARadioGroup>
      <AFlex
        justify="end"
        class="footer"
      >
        <AButton
          type="primary"
          :disabled="isMultiple ? !multipleResponse.length : !response"
          @click="handleSubmit"
        >
          Submit
        </AButton>
      </AFlex>
    </ACard>
  </AFlex>
</template>

<style scoped>
.footer {
  margin-top: 16px;
}

</style>
