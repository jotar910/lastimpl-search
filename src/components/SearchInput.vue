<template>
  <div class="flex relative mx-auto max-w-md">
    <input v-model="value" type="search" placeholder="Procurar"
           class="border-2 border-secondary-a-500 bg-red transition h-12 px-5 pr-12 rounded-4xl focus:outline-none w-full text-black text-lg
                  dark:text-background-dark"/>
    <button class="absolute right-2 top-3 mr-4 text-secondary dark:text-background-dark">
      <fa-icon icon="search"></fa-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: ['modelValue'],
  emits: ['update:modelValue']
})
export default class SearchInput extends Vue {
  modelValue = ''

  get value (): string {
    return this.modelValue
  }

  set value (term: string) {
    this.$emit('update:modelValue', term)
  }
}
</script>

<style scoped>
</style>
