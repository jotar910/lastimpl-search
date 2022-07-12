<template>
  <article class="shadow-lg collapse pt-4 bg-white border-2 border-dashed rounded-lg dark:bg-background-dark"
           :class="{
              'border-primary dark:border-light-blue': editing,
              'dark:border-gray-500': !editing
            }">
    <collapsable>
      <template v-slot:header>
        <div class="flex justify-between items-center">
          <div class="flex flex-col mr-4">
            <editable-box v-model="name" :initial-model="originalName" class="text-gray-700 text-xl dark:text-white mb-3 py-2 px-3 mr-auto" ref="nameBox"
                          :save="saveName" :disabled="isLoadingName" :error="hasPendingName" :retry="hasPendingName"
                          @closeError="closeNameError"/>
            <editable-box v-model="description" :initial-model="originalDescription" class="text-secondary-a-500 dark:text-gray-200 mb-3 py-2 px-3 mr-auto" ref="descriptionBox"
                          :save="saveDescription" :disabled="isLoadingDescription" :error="hasPendingDescription" :retry="hasPendingDescription"
                          @closeError="closeDescriptionError"/>
          </div>
          <div class="flex row-start-1 row-end-3 col-start-2 hover-visible">
            <template v-if="editing">
              <button class="text-primary dark:text-light-blue p-2 mr-2" @click="saveEditing">
                <fa-icon icon="save" size="lg"></fa-icon>
              </button>
              <button class="text-primary dark:text-light-blue p-2 mr-2" @click="cancelEditing">
                <fa-icon icon="xmark" size="lg"></fa-icon>
              </button>
            </template>
            <button class="text-secondary dark:text-white p-2 mr-2" @click="deleteProject">
              <fa-icon icon="trash" size="lg"></fa-icon>
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
import { ProjectItemContext, ProjectItemModel } from '@/models/project/project-item.model';
import LocalLoading from '@/components/LocalLoading.vue';
import { newCombinedValue } from '@/utils/types.utils';
import { createCancelOptions, createDeleteOptions } from '@/models/confirmation-options.model';
import { ProjectCodeFilesViewModel } from '@/models/project/project-code-files-view.model';
import EditableBox from '@/components/EditableBox.vue';

@Options({
  components: {
    EditableBox,
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

  get originalName(): string {
    return this.project.name.original;
  }

  get name(): string {
    return this.project.name.modified;
  }

  set name(value: string) {
    this.$store.commit('projects/updateProjectName', newCombinedValue(this.projectContext.idx, value));
  }

  get isLoadingName(): boolean {
    return this.$store.getters['projects/isProjectNameLoading'](this.project.id);
  }

  get hasPendingName(): boolean {
    return this.$store.getters['projects/hasPendingName'](this.project.id);
  }

  get originalDescription(): string {
    return this.project.description.original;
  }

  get description(): string {
    return this.project.description.modified;
  }

  set description(value: string) {
    this.$store.commit('projects/updateProjectDescription', newCombinedValue(this.projectContext.idx, value));
  }

  get isLoadingDescription(): boolean {
    return this.$store.getters['projects/isProjectDescriptionLoading'](this.project.id);
  }

  get hasPendingDescription(): boolean {
    return this.$store.getters['projects/hasPendingDescription'](this.project.id);
  }

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

  private get projectContext(): ProjectItemContext {
    return this.$store.getters['projects/projectContext'](this.project.id);
  }

  async startEditing(fileId?: number): Promise<void> {
    if (fileId === undefined) {
      return this.$store.dispatch('projects/addFile', this.project);
    }
    return this.$store.dispatch('projects/editFile', newCombinedValue(this.project, fileId));
  }

  deleteProject(): void {
    this.$store.commit('confirmation/open', createDeleteOptions('dispatch',
      'projects/deleteProject', this.project.id));
  }

  saveEditing(): void {
    this.$store.dispatch('projects/saveProjectFiles', this.project.id);
  }

  cancelEditing(): void {
    this.$store.commit('confirmation/open', createCancelOptions('commit',
      'projects/removeEditableProjectFiles', this.project.id));
  }

  async saveName(): Promise<boolean> {
    await this.$store.dispatch('projects/saveProjectName', newCombinedValue(this.projectContext, this.name));
    console.log('joao has error', this.$store.getters['projects/hasProjectNameError'](this.project.id));
    return !this.$store.getters['projects/hasProjectNameError'](this.project.id);
  }

  async saveDescription(): Promise<boolean> {
    await this.$store.dispatch('projects/saveProjectDescription', newCombinedValue(this.projectContext, this.description));
    console.log('joao has error', this.$store.getters['projects/hasProjectDescriptionError'](this.project.id));
    return !this.$store.getters['projects/hasProjectDescriptionError'](this.project.id);
  }

  closeNameError(): void {
    this.$store.dispatch('projects/clearEditingProjectName', this.project.id);
    this.$store.commit('projects/resetProjectName', this.projectContext.idx);
  }

  closeDescriptionError(): void {
    this.$store.dispatch('projects/clearEditingProjectDescription', this.project.id);
    this.$store.commit('projects/resetProjectDescription', this.projectContext.idx);
  }
}
</script>

<style lang="scss" scoped>
.hover-visible {
  visibility: hidden;
}

article:hover {
  .hover-visible {
    visibility: visible;
  }
}
</style>
