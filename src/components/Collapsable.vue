<template>
  <header class="px-3 md:px-5">
    <slot name="header"></slot>
    <button class="w-full border-t border-gray-200
                   dark:border-gray-500" @click="toggle">
      <fa-icon v-if="!open" icon="chevron-down" class="text-gray-300 mt-1.5 mx-auto"></fa-icon>
      <fa-icon v-else icon="chevron-up" class="text-gray-300 mt-1.5 mx-auto"></fa-icon>
    </button>
  </header>
  <transition name="collapsing" @enter="transitionEnter" @after-leave="transitionLeave">
    <main v-show="open" class="overflow-hidden collapsing--body" :style="{'--height': contentHeightStyle}">
      <div ref="collapsingWrapper">
        <slot name="body"></slot>
      </div>
    </main>
  </transition>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Collapsable extends Vue {
  open = false;
  contentHeightStyle: string | null = null;
  $refs!: { collapsingWrapper: HTMLDivElement };

  toggle (): void {
    this.open = !this.open;
  }

  transitionEnter (): void {
    this.contentHeightStyle = `${this.$refs.collapsingWrapper?.clientHeight}px`;
  }

  transitionLeave (): void {
    this.contentHeightStyle = null;
  }
}
</script>

<style lang="scss" scoped>
.collapsing--body {
  backface-visibility: hidden;
}

.collapsing-enter-active {
  transition: max-height .3s ease-out;
}

.collapsing-leave-active {
  transition: max-height .25s ease-in;
}

.collapsing-enter-from,
.collapsing-leave-to {
  max-height: 0;
}

.collapsing-leave-from,
.collapsing-enter-to {
  max-height: var(--height, auto)
}
</style>
