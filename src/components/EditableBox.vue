<template>
  <div @click.stop="!editing && startEdit()"
       class="flex content-center appearance-none border border-transparent rounded leading-tight cursor-text"
       :class="{
        'shadow dark:shadow-blue-300': editing,
        'border-red-600 text-red-600': error,
        'hover:shadow hover:dark:shadow-blue-200': !disabled
      }">
    <p :contenteditable="!disabled" role="textbox" class="h-full mb-0 focus:outline-none"
       @input="value = $event.target.textContent" @keyup.esc="cancelEdit" @blur="saveEdit" ref="box">
      {{ value }}
    </p>
    <template v-if="retry">
      <button class="ml-2 hover:opacity-75" @click.stop="doSaveEdit">
        <fa-icon icon="rotate-right" size="sm"/>
      </button>
    </template>
    <template v-if="error">
      <button class="ml-2 hover:opacity-75" @click.stop="closeError">
        <fa-icon icon="xmark"/>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    disabled: Boolean,
    error: Boolean,
    retry: Boolean,
    initialModel: String,
    modelValue: String,
    save: Function
  },
  emits: ['update:modelValue', 'change', 'retry', 'closeError']
})
export default class EditableBox extends Vue {
  editing: boolean = false;

  disabled: boolean = false;

  error: boolean = false;

  retry: boolean = false;

  initialModel!: string;

  modelValue!: string;

  initialValue!: string;

  save?: (value: string) => boolean | Promise<boolean>;

  $refs!: { box: HTMLElement };

  private trackingModel!: string;

  get value(): string {
    return this.modelValue;
  }

  set value(term: string) {
    this.$emit('update:modelValue', term);
  }

  mounted(): void {
    this.$watch(() => this.initialModel, () => {
      this.initialValue = this.initialModel ?? this.value;
      this.trackingModel = this.value;
    }, { immediate: true });
  }

  startEdit(): void {
    this.trackingModel = this.value;
    this.editing = true;
  }

  saveEdit(): void {
    if (!this.value || this.value === this.trackingModel) {
      this.value = this.trackingModel;
      this.editing = false;
      return;
    }
    this.doSaveEdit();
  }

  async doSaveEdit(): Promise<void> {
    if (!!this.save && !(await this.save(this.value))) {
      this.editing = false;
      return;
    }
    this.$emit('change', this.value);
    this.initialValue = this.value;
    this.editing = false;
  }

  cancelEdit(): void {
    this.value = this.trackingModel;
    this.editing = false;
    setTimeout(() => this.$refs.box?.blur());
  }

  closeError(): void {
    this.$emit('closeError');
  }
}
</script>

<style scoped>
/*p {
  min-height: 25px;
}*/
</style>
