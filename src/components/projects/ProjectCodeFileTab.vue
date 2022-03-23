<template>
  <a :class="{'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer': !selected,
        'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500': selected}"
     class="inline-block py-3 px-3 text-sm font-medium text-center rounded-t-lg border-b-2 relative"
     @click="!selected && selectFile()">
    <button class="mr-2" :class="{'hover-btn': !editing}" @click.stop="!editing && startEdit()">
      <fa-icon :class="{'text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300': !selected,
                  'text-blue-600 dark:text-blue-500': selected}"
               icon="pencil-alt" size="sm"/>
    </button>
    <span>{{ editing ? name : name || $t('common.unknown') }}</span>
    <input v-if="editing" type="text" v-model="name" ref="nameInput" class="none w-0 h-0"
           @keyup.esc="cancelEdit" @keyup.enter="stopEdit" @blur="stopEdit">
    <button class="mx-2" @click.stop="deleteFile">
      <fa-icon :class="{'text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300': !selected,
                  'text-blue-600 dark:text-blue-500': selected}"
               icon="xmark" size="sm"/>
    </button>
  </a>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { newCombinedValue } from '@/utils/types.utils';
import { createDeleteOptions } from '@/models/confirmation-options.model';
import { ProjectCodeFileViewModel } from '@/models/project/project-code-file-view.model';
import { findProjectFile } from '@/models/project/project-code-files-view.model';

@Options({
  props: {
    fileId: {
      type: String,
      required: true
    },
    projectId: {
      type: Number,
      required: true
    },
    selected: Boolean
  }
})
export default class ProjectCodeFileTab extends Vue {
  projectId!: number;

  fileId!: string;

  selected: boolean = false;

  editing: boolean = false;

  $refs!: { nameInput: HTMLInputElement };

  get name(): string {
    return this.file.name;
  }

  set name(value: string) {
    this.$store.dispatch('projects/editFileName', newCombinedValue({
      projectId: this.projectId,
      fileId: this.fileId
    }, value));
  }

  get file(): ProjectCodeFileViewModel {
    return findProjectFile(this.$store.getters['projects/editingFiles'](this.projectId), this.fileId);
  }

  private fileName!: string;

  mounted(): void {
    this.fileName = this.file.name;
  }

  startEdit(): void {
    this.editing = true;
    this.$nextTick(() => this.$refs.nameInput.focus());
  }

  stopEdit(): void {
    if (!this.name) {
      this.cancelEdit();
      return;
    }
    this.fileName = this.name;
    this.editing = false;
  }

  cancelEdit(): void {
    this.name = this.fileName;
    this.editing = false;
  }

  selectFile(): void {
    this.$store.dispatch('projects/selectFile', newCombinedValue(this.projectId, this.fileId));
  }

  deleteFile(): void {
    if (!this.file.name && !this.file.content) {
      this.$store.dispatch('projects/removeFile', newCombinedValue(this.projectId, this.fileId));
      return;
    }
    this.$store.commit('confirmation/open', createDeleteOptions('dispatch',
      'projects/removeFile', newCombinedValue(this.projectId, this.fileId)));
  }
}
</script>

<style lang="scss" scoped>
a {
  position: relative;

  .absolute-btn {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }

  .hover-btn {
    visibility: hidden;
  }

  &:hover {
    .hover-btn {
      visibility: visible;
    }
  }
}
</style>
