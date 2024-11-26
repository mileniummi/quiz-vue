<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { QuizGameRoundDescription } from '~/entities/quiz/model/quiz-game-rounds.ts';
import { IQuiz } from '~/entities/quiz/model/types.ts';
import ClockIcon from '~/assets/icons/ClockIcon.vue';
import { useQuizStore } from '~/shared/store/slices/quiz.store.ts';

interface Props {
  quiz: IQuiz;
}

defineProps<Props>();
const store = useQuizStore();
const { getQuizLatestAttempt } = storeToRefs(store);
</script>

<template>
  <AFlex
    vertical
    gap="small"
  >
    <ATypographyTitle
      class="rounds-title"
      :level="4"
    >
      Rounds
    </ATypographyTitle>
    <AList>
      <AListItem
        v-for="round in QuizGameRoundDescription"
        :key="round.name"
        :class="{'round': true}"
      >
        <ACard
          :class="{
            'round-description': true,
            'selected': round.name === getQuizLatestAttempt(quiz.id)?.round
          }"
          size="small"
        >
          <ACardMeta>
            <template #avatar>
              <component :is="round.icon" />
            </template>
            <template #description>
              <AFlex justify="space-between">
                <ATypographyTitle :level="5">
                  {{ round.name }}
                </ATypographyTitle>
                <ATypographyText>
                  <AFlex align="center">
                    <ClockIcon />
                    {{
                      (quiz.rounds[round.name].getRoundDuration() / 60)
                        .toFixed(2).padStart(4, '0').replace('.', ':')

                    }}
                  </AFlex>
                </ATypographyText>
              </AFlex>
            </template>
          </ACardMeta>
        </ACard>
      </AListItem>
    </AList>
  </AFlex>
</template>

<style scoped>

.rounds-title {
  margin: 0;
  text-align: left;
}

.round {
  padding: 0 0 8px;
}

.round-description.selected {
  background: #1668dc;
}

.round-description {
  width: 220px;
}

</style>
