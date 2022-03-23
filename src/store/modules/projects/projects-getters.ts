import { GetterTree } from 'vuex';
import { ProjectsState } from '@/store/modules/projects/projects-state';
import { StoreState } from '@/store/store.model';
import { ErrorModel } from '@/models/error.model';
import { ProjectListModel } from '@/models/project/project-list.model';
import { ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectCodeFilesViewModel } from '@/models/project/project-code-files-view.model';

interface ProjectsGetters {
  listFilters (state: ProjectsState): ProjectListFiltersModel | null;

  listLoading (state: ProjectsState): boolean;

  listError (state: ProjectsState): ErrorModel | null;

  listResults (state: ProjectsState): ProjectListModel | null;

  editingFiles (state: ProjectsState): (projectId: number) => ProjectCodeFilesViewModel;

  isEditingFiles (state: ProjectsState): (projectId: number) => boolean;

  isLoadingFiles (state: ProjectsState): (projectId: number) => boolean;

  hasFilesError(state: ProjectsState): (projectId: number) => boolean;
}

export const projectsGetters: GetterTree<ProjectsState, StoreState> & ProjectsGetters = {
  listFilters: (state: ProjectsState): ProjectListFiltersModel | null => state.listFilters,
  listLoading: (state: ProjectsState): boolean => state.listLoading,
  listError: (state: ProjectsState): ErrorModel | null => state.listError,
  listResults: (state: ProjectsState): ProjectListModel | null => state.listResults,
  editingFiles: (state: ProjectsState): (projectId: number) => ProjectCodeFilesViewModel =>
    (projectId: number): ProjectCodeFilesViewModel => state.editingProjectFiles[projectId],
  isEditingFiles: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => !!state.editingProjectFiles[projectId],
  isLoadingFiles: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => state.loadProjectFilesLoading[projectId],
  hasFilesError: (state: ProjectsState): (projectId: number) => boolean =>
    (projectId: number): boolean => !!state.loadProjectFilesError[projectId]
};
