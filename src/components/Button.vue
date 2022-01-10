<template>
  <button :class="buttonClass"
          class="cursor-pointer shadow-xl px-5 py-2 inline-block rounded disabled:opacity-50 disabled:cursor-not-allowed">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

export type ButtonStyle = 'primary' | 'secondary' | '';

export default class Button extends Vue {
  @Prop({ default: ['primary'] })
  buttonStyles!: ButtonStyle[] | ButtonStyle

  get buttonClass (): string[] {
    return (Array.isArray(this.buttonStyles) ? this.buttonStyles : [this.buttonStyles])
      .map((style: ButtonStyle) => {
        console.log(style)
        switch (style) {
          case 'primary':
            return 'text-gray-200 bg-primary-a-700 hover:text-white hover:bg-primary-a-800'
          case 'secondary':
            return 'text-gray-200 bg-secondary-a-800 hover:text-white hover:bg-secondary-a-900' +
              ' dark:bg-background-l2-dark dark:hover:bg-background-l2-dark-a-700'
          default:
            return ''
        }
      })
  }
}
</script>

<style scoped>

</style>
