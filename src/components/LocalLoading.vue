<template>
  <div class="h-1 w-full bg-primary-a-500 dark:bg-secondary-a-500 relative overflow-hidden" v-bind="$attrs"></div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class LocalLoading extends Vue {
}
</script>

<style lang="scss" scoped>
div {
  max-width: 500px;

  &::after {
    @apply absolute h-1 w-full bg-primary dark:bg-secondary;
    animation: left-right cubic-bezier(.75, .03, .78, .93) 1.5s infinite;
    content: '';
  }
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
