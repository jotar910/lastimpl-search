<template>
  <teleport to="body">
    <div class="top-0 left-0 fixed h-1 w-full bg-primary-a-500 dark:bg-secondary-a-500" v-bind="$attrs"></div>
  </teleport>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class GlobalLoading extends Vue {
}
</script>

<style lang="scss" scoped>
div::after {
  @apply top-0 left-0 fixed h-1 w-full bg-primary dark:bg-secondary;
  animation: left-right cubic-bezier(.75,.03,.78,.93) 2.5s infinite;
  content: '';
}

@keyframes left-right {
  from {
    transform: translateX(-120%);
  }
  to {
    transform: translateX(120%);
  }
}
</style>
