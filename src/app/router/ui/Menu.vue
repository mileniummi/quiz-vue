<script setup lang="ts">
import { ref } from 'vue';
import { MenuProps } from 'ant-design-vue';
import router, { routes } from '~/app/router/model/router.ts';

const menu = ref<MenuProps['items']>(routes.map((route) => ({
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
