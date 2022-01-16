<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { overrideTailwindClasses } from 'tailwind-override'

export type ButtonStyle = 'primary' | 'secondary' | 'secondary-outline' | 'xs' | '';

@Options({
  props: {
    buttonStyles: {
      type: Array,
      default: ['primary']
    }
  }
})
export default class Button extends Vue {
  buttonStyles!: Array<ButtonStyle> | ButtonStyle

  get buttonClass (): string {
    const defaultClass = 'cursor-pointer shadow-xl px-5 py-2 inline-block rounded disabled:opacity-50 disabled:cursor-not-allowed'
    const customClass: string = (Array.isArray(this.buttonStyles) ? this.buttonStyles : [this.buttonStyles])
      .map((style: ButtonStyle) => {
        switch (style) {
          case 'primary':
            return 'text-gray-200 bg-primary-a-700 hover:text-white hover:bg-primary-a-800'
          case 'secondary':
            return 'text-gray-200 bg-secondary-a-800 hover:text-white hover:bg-secondary-a-900' +
              ' dark:bg-background-l2-dark dark:hover:bg-background-l2-dark-a-700'
          case 'secondary-outline':
            return 'text-gray-800 border-gray-800 bg-transparent hover:text-gray-500 hover:border-gray-500' +
              ' dark:border-gray-50 dark:text-gray-50 dark:hover:text-gray-300 dark:hover:border-gray-300'
          case 'xs':
            return 'shadow text-sm px-2 py-1'
          default:
            return ''
        }
      }).join(' ')
    return overrideTailwindClasses(`${defaultClass} ${customClass}`)
  }
}
</script>

<style scoped>

</style>
