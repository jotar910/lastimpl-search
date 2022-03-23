<template>
  <div class="flex relative">
    <input v-model="value" type="search" :placeholder="$t('common.search')" :class="inputStyles"
           class="bg-red transition px-5 pr-12 w-full text-black
                  border-2 border-secondary-a-500 rounded-4xl
                  dark:text-background-dark focus:outline-none"/>
    <button :class="buttonClass" @click.prevent="$emit('search')" :title="$t('common.search')">
      <fa-icon icon="search" class="w-100 h-full"></fa-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { overrideTailwindClasses } from 'tailwind-override';

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
  modelValue!: string;

  inputStyles!: Array<string>;

  buttonStyles!: Array<string>;

  get buttonClass (): string {
    const defaultClass = 'absolute text-secondary w-4 dark:text-background-dark hover:opacity-50';
    const customClass: string = this.buttonStyles.join(' ');
    return overrideTailwindClasses(`${defaultClass} ${customClass}`);
  }

  get value (): string {
    return this.modelValue;
  }

  set value (term: string) {
    this.$emit('update:modelValue', term);
  }
}
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
