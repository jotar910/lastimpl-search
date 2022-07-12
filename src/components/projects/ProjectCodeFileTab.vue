<template>
  <a :class="{'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer': !selected,
        'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500': selected}"
     class="flex py-3 px-3 text-sm font-medium text-center rounded-t-lg border-b-2 relative"
     @click="!selected && selectFile()">
    <button class="mr-2" :class="{'invisible': !$refs.nameInput?.editing}">
      <fa-icon :class="{'text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300': !selected,
                  'text-blue-600 dark:text-blue-500': selected}"
               icon="pencil-alt" size="sm"/>
    </button>
    <editable-box v-model="name" ref="nameInput"/>
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
import EditableBox from '@/components/EditableBox.vue';

@Options({
  components: {
    EditableBox
  },
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

  $refs!: { nameInput?: EditableBox };

  get name(): string {
    return this.$refs.nameInput?.editing ? this.file.name : this.file.name || this.$t('common.unknown');
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
