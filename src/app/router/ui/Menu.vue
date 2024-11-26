<script setup lang="ts">
import { ref } from 'vue';
import { MenuProps } from 'ant-design-vue';
import router, { routes } from '~/app/router/model/router.ts';
import { EAppRoutes, MenuDisplayedRoutes } from '~/app/router/model/constants.ts';

const menu = ref<MenuProps['items']>(routes
  .filter((route) => MenuDisplayedRoutes.includes(route.path as EAppRoutes))
  .map((route) => ({
    key: route.path,
    label: route.name,
    onClick: () => router.push({ path: route.path }),
  })));

</script>

<template>
  <AMenu
    mode="horizontal"
    :items="menu"
  />
</template>

<style>
</style>
