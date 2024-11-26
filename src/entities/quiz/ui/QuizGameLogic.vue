<script setup lang="ts">
import { computed, ref } from 'vue';
import { IQuiz } from '~/entities/quiz/model/types.ts';
import { IQuizAttempt } from '~/entities/quiz-results/model/types.ts';

interface Props {
  quiz: IQuiz;
  attempt: IQuizAttempt;
}

const props = defineProps<Props>();
const response = ref<string>();
const multipleResponse = ref<string[]>([]);

const currentRound = computed(() => props.quiz.rounds[props.attempt.round]);
const question = computed(() => currentRound.value.questions[props.attempt.questionNumber]);
const isMultiple = computed(() => question.value.multiple_correct_answers === 'true');

const deadline = Date.now() + currentRound.value.timePerQuestion * 1000;

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
        >
          <ATypographyParagraph>
            Question: {{ question.question }}
          </ATypographyParagraph>
          <AStatisticCountdown
            format="mm:ss"
            :value="deadline"
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
        >
          Submit
        </AButton>
      </AFlex>
    </ACard>
  </AFlex>
</template>

<style>
.footer {
  margin-top: 16px;
}

</style>
