import { GetterTree } from 'vuex';
import { ProjectsState } from '@/store/modules/projects/projects-state';
import { StoreState } from '@/store/store.model';
import { ErrorModel } from '@/models/error.model';
import { ProjectListModel } from '@/models/project/project-list.model';
import { ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectCodeFilesViewModel } from '@/models/project/project-code-files-view.model';
import { ProjectItemContext, ProjectItemDetailsModel, ProjectItemModel } from '@/models/project/project-item.model';

interface ProjectsGetters {
  listFilters(state: ProjectsState): ProjectListFiltersModel | null;

  listLoading(state: ProjectsState): boolean;

  listError(state: ProjectsState): ErrorModel | null;

  listResults(state: ProjectsState): ProjectListModel | null;

  projectContext(state: ProjectsState): (id: number) => ProjectItemContext | null;

  editingFiles(state: ProjectsState): (projectId: number) => ProjectCodeFilesViewModel;

  isEditingFiles(state: ProjectsState): (projectId: number) => boolean;

  isLoadingFiles(state: ProjectsState): (projectId: number) => boolean;

  hasFilesError(state: ProjectsState): (projectId: number) => boolean;
}

export const projectsGetters: GetterTree<ProjectsState, StoreState> & ProjectsGetters = {
  listFilters: (state: ProjectsState): ProjectListFiltersModel | null => state.listFilters,
  listLoading: (state: ProjectsState): boolean => state.listLoading,
  listError: (state: ProjectsState): ErrorModel | null => state.listError,
  listResults: (state: ProjectsState): ProjectListModel | null => state.listResults,
  projectContext: (state: ProjectsState): (id: number) => ProjectItemContext | null => {
    return (id: number) => {
      const idx: number = state.listResults?.data.findIndex((item: ProjectItemModel) => item.id === id) ?? -1;
      console.log('joao searching', idx);
      if (idx === -1) {
        return null;
      }
      return {
        item: state.listResults!.data[idx],
        idx
      } ?? null;
    };
  },
  editingDetails: (state: ProjectsState): (projectId: number) => Partial<ProjectItemDetailsModel> | null =>
    (projectId: number): Partial<ProjectItemDetailsModel> | null => state.editingProjectDetails[projectId] ?? null,
  hasPendingName: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => state.editingProjectDetails[projectId]?.name !== undefined,
  hasPendingDescription: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => state.editingProjectDetails[projectId]?.description !== undefined,
  isProjectNameLoading: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => state.saveProjectNameLoading[projectId],
  hasProjectNameError: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => !!state.saveProjectNameError[projectId],
  isProjectDescriptionLoading: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => state.saveProjectDescriptionLoading[projectId],
  hasProjectDescriptionError: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => !!state.saveProjectDescriptionError[projectId],
  editingFiles: (state: ProjectsState): (projectId: number) => ProjectCodeFilesViewModel =>
    (projectId: number): ProjectCodeFilesViewModel => state.editingProjectFiles[projectId],
  isEditingFiles: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => !!state.editingProjectFiles[projectId],
  isLoadingFiles: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => state.loadProjectFilesLoading[projectId],
  hasFilesError: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => !!state.loadProjectFilesError[projectId],
  createProjectLoading: (state: ProjectsState): boolean => state.createProjectLoading
};
