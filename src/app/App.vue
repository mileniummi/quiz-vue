<script setup lang="ts">
import { theme } from '../theme.ts';
import Menu from '~/app/router/ui/Menu.vue';
</script>

<template>
  <AConfigProvider :theme="theme">
    <AApp>
      <ALayout>
        <AFlex
          vertical
          gap="16"
        >
          <Menu />
          <RouterView />
        </AFlex>
      </ALayout>
    </AApp>
  </AConfigProvider>
</template>

<style>
</style>
