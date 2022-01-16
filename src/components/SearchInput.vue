<template>
  <div class="flex relative">
    <input v-model="value" type="search" :placeholder="$t('words.search')" :class="inputStyles"
           class="bg-red transition px-5 pr-12 w-full text-black
                  border-2 border-secondary-a-500 rounded-4xl
                  dark:text-background-dark focus:outline-none"/>
    <button :class="buttonStyles" class="absolute text-secondary dark:text-background-dark w-4"
            @click.prevent="this.$emit('search')" :title="$t('words.search')">
      <fa-icon icon="search" class="w-100 h-full"></fa-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    modelValue: {
      type: String
    },
    inputStyles: {
      type: Array,
      default: ['text-lg', 'h-12']
    },
    buttonStyles: {
      type: Array,
      default: ['right-5', 'top-3']
    }
  },
  emits: ['update:modelValue', 'search']
})
export default class SearchInput extends Vue {
  modelValue!: string

  inputStyles!: Array<string>

  buttonStyles!: Array<string>

  get value (): string {
    return this.modelValue
  }

  set value (term: string) {
    this.$emit('update:modelValue', term)
  }
}
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
