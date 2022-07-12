<template>
  <div class="flex border-b border-gray-200 dark:border-gray-700">
    <ul class="flex -mb-px tab-element">
      <template v-for="file of files" :key="file.internalId">
        <li class="mr-2">
          <project-code-file-tab :project-id="editingFiles.projectId" :file-id="file.internalId"
                                 :selected="file.internalId === curFileId"></project-code-file-tab>
        </li>
      </template>
    </ul>
    <button class="tab-element inline-block py-3 px-3 text-sm font-medium text-center rounded-t-lg border-b-2 relative
                   text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            @click="addNewFile">
      <fa-icon icon="plus" size="sm"/>
    </button>
  </div>
  <div ref="editorEl" :class="{'toastui-editor-dark': $store.getters.darkMode}"></div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Options, Vue } from 'vue-class-component';
import Editor from '@toast-ui/editor';
import sanitize from 'sanitize-html';
import { newCombinedValue } from '@/utils/types.utils';
import { ProjectCodeFileViewModel } from '@/models/project/project-code-file-view.model';
import { findProjectFile, ProjectCodeFilesViewModel } from '@/models/project/project-code-files-view.model';
import ProjectCodeFileTab from '@/components/projects/ProjectCodeFileTab.vue';

@Options({
  components: { ProjectCodeFileTab },
  props: {
    editingFiles: {
      type: Object as PropType<ProjectCodeFilesViewModel>,
      required: true
    }
  },
  watch: {
    curFileId: {
      handler: 'updateEditor'
    }
  }
})
export default class ProjectFilesEditor extends Vue {
  $refs!: { editorEl: HTMLElement };

  editingFiles!: ProjectCodeFilesViewModel;

  editor!: Editor;

  get curFileId(): string {
    return this.editingFiles.selectedId;
  }

  get curFile(): ProjectCodeFileViewModel {
    return findProjectFile(this.editingFiles, this.curFileId);
  }

  get files(): ProjectCodeFileViewModel[] {
    return this.editingFiles.cur;
  }

  mounted(): void {
    this.editor = new Editor({
      el: this.$refs.editorEl,
      initialValue: this.curFile.content,
      autofocus: false,
      placeholder: this.$t('common.hint.type'),
      height: '50vh'
    });
    this.editor.on('change', () => this.$store.dispatch('projects/editFileContent', newCombinedValue({
      projectId: this.editingFiles.projectId,
      fileId: this.editingFiles.selectedId
    }, sanitize(this.editor?.getMarkdown()))));
  }

  updateEditor(): void {
    this.editor.setMarkdown(this.curFile.content);
  }

  addNewFile(): void {
    this.$store.dispatch('projects/selectNewFile', this.editingFiles.projectId);
  }
}
</script>

<style lang="scss" scoped>
.tab-element {
  position: relative;
  top: 2px;
  z-index: 1;
}

ul {
  overflow: auto;
  scroll-snap-type: x proximity;

  li {
    scroll-snap-align: start;
  }

  &::-webkit-scrollbar {
    height: 0;
  }
}
</style>
