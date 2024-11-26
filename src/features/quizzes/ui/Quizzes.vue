<script setup lang="ts">
import { useQuizStore } from '~/shared/store/slices/quiz.store.ts';
import { EAppRouteNames, EAppRoutes } from '~/app/router/model/constants.ts';
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
      <RouterLink :to="EAppRoutes.CreateQuiz">
        <AButton type="primary">
          Create New Quiz
        </AButton>
      </RouterLink>
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
            <RouterLink :to="{ name: EAppRouteNames.Quiz, params: { id: item.id } }">
              <AButton>Play</AButton>
            </RouterLink>
          </template>
        </AListItem>
      </template>
    </AList>
  </AFlex>
</template>

<style>
</style>
