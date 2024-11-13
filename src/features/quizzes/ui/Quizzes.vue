<script setup lang="ts">
import { useQuizStore } from '~/features/quizzes/model/quiz.store.ts';
import { EAppRoutes } from '~/app/router/model/constants.ts';
import { getRandomDarkPaletteColor } from '~/shared/constants/colors.ts';

const store = useQuizStore();
</script>

<template>
  <AFlex
    gap="16"
    vertical
  >
    <AFlex
      justify="space-between"
    >
      <ATypographyTitle :level="3">
        Quizzes
      </ATypographyTitle>
      <AButton type="primary">
        <RouterLink :to="EAppRoutes.CreateQuiz">
          Create New Quiz
        </RouterLink>
      </AButton>
    </AFlex>
    <AList
      bordered
      :data-source="store.quizzes"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <AListItem>
          <AListItemMeta>
            <template #title>
              {{ item.name }}
            </template>
            <template #avatar>
              <AAvatar :style="{backgroundColor: getRandomDarkPaletteColor()}" />
            </template>
          </AListItemMeta>
          <template #actions>
            <AButton>
              <RouterLink :to="{ name: EAppRoutes.Quiz, params: { id: item.id } }">
                Play
              </RouterLink>
            </AButton>
          </template>
        </AListItem>
      </template>
    </AList>
  </AFlex>
</template>

<style>
</style>
