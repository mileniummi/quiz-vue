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
          <RouterView v-slot="{ Component }">
            <Transition
              name="fade"
              mode="out-in"
              :duration="100"
              appear
            >
              <component :is="Component" />
            </Transition>
          </RouterView>
        </AFlex>
      </ALayout>
    </AApp>
  </AConfigProvider>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
