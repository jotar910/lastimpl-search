<template>
  <article class="shadow-lg collapse pt-4 bg-white border-2 border-dashed rounded-lg dark:bg-background-dark"
           :class="{
              'border-primary dark:border-light-blue': editing,
              'dark:border-gray-500': !editing
            }">
    <collapsable>
      <template v-slot:header>
        <div class="grid auto-cols-min justify-between items-center gap-x-4">
          <span class="block text-secondary text-xl mb-3
                     dark:text-white">{{ project.name }}</span>
          <p class="block text-secondary-a-500 mb-3
                  dark:text-gray-200">{{ project.description }}</p>
          <div class="flex row-start-1 row-end-3 col-start-2" v-if="editing">
            <button class="text-primary dark:text-light-blue p-2 mr-2" @click="saveEditing">
              <fa-icon icon="save" size="lg"></fa-icon>
            </button>
            <button class="text-primary dark:text-light-blue p-2 mr-2" @click="cancelEditing">
              <fa-icon icon="xmark" size="lg"></fa-icon>
            </button>
          </div>
        </div>
      </template>
      <template v-slot:body>
        <div class="p-3 md:p-5 relative" :class="{'pointer-events-none': loading}">
          <div class="bg-white-a-800 absolute flex h-full items-center left-0 top-0 z-10 w-full" v-if="loading">
            <local-loading class="mx-auto"/>
          </div>
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
               role="alert">{{ $t('errors.loadFiles') }}
          </div>
          <project-files-list v-else-if="!editing" :files="project.files"
                              @addFile="startEditing" @editFile="startEditing($event)"/>
          <project-files-editor v-else :editing-files="editingFiles"/>
        </div>
      </template>
    </collapsable>
  </article>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Options, Vue } from 'vue-class-component';
import Collapsable from '@/components/Collapsable.vue';
import ProjectFilesEditor from '@/components/projects/ProjectFilesEditor.vue';
import ProjectFilesList from '@/components/projects/ProjectFilesList.vue';
import { ProjectItemModel } from '@/models/project/project-item.model';
import LocalLoading from '@/components/LocalLoading.vue';
import { newCombinedValue } from '@/utils/types.utils';
import { createCancelOptions } from '@/models/confirmation-options.model';
import { ProjectCodeFilesViewModel } from '@/models/project/project-code-files-view.model';

@Options({
  components: {
    LocalLoading,
    Collapsable,
    ProjectFilesEditor,
    ProjectFilesList
  },
  props: {
    project: {
      type: Object as PropType<ProjectItemModel>,
      required: true
    }
  }
})
export default class ProjectItem extends Vue {
  project!: ProjectItemModel;

  get loading(): boolean {
    return this.$store.getters['projects/isLoadingFiles'](this.project.id);
  }

  get editing(): boolean {
    return this.$store.getters['projects/isEditingFiles'](this.project.id);
  }

  get editingFiles(): ProjectCodeFilesViewModel {
    return this.$store.getters['projects/editingFiles'](this.project.id);
  }

  get error(): boolean {
    return this.$store.getters['projects/hasFilesError'](this.project.id);
  }

  async startEditing(fileId?: number): Promise<void> {
    if (fileId === undefined) {
      return this.$store.dispatch('projects/addFile', this.project);
    }
    return this.$store.dispatch('projects/editFile', newCombinedValue(this.project, fileId));
  }

  saveEditing(): void {
    this.$store.dispatch('projects/saveProjectFiles', this.project.id);
  }

  cancelEditing(): void {
    this.$store.commit('confirmation/open', createCancelOptions('commit',
      'projects/removeEditableProjectFiles', this.project.id));
  }
}
</script>
