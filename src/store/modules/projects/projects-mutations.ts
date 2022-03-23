import { MutationTree } from 'vuex';
import { omit } from 'lodash';
import { ProjectsState } from '@/store/modules/projects/projects-state';
import { ErrorModel } from '@/models/error.model';
import { ProjectListModel } from '@/models/project/project-list.model';
import { ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectCodeFilesViewModel } from '@/models/project/project-code-files-view.model';
import { Combinator } from '@/utils/types.utils';

interface ProjectsMutations {
  setFilters(state: ProjectsState, filters: ProjectListFiltersModel): void;

  searchListStarted(state: ProjectsState): void;

  searchListError(state: ProjectsState, error: ErrorModel): void;

  setListResults(state: ProjectsState, results: ProjectListModel): void;

  editProjectFilesLoading(state: ProjectsState, projectId: number): void;

  editProjectFilesError(state: ProjectsState, projectError: Combinator<number, ErrorModel>): void;

  setEditableProjectFiles(state: ProjectsState, projectFiles: ProjectCodeFilesViewModel): void;

  updateEditableProjectFiles(state: ProjectsState, projectFiles: ProjectCodeFilesViewModel): void;

  saveProjectFilesStarted(state: ProjectsState, projectId: number): void;

  saveProjectFilesError(state: ProjectsState, projectError: Combinator<number, ErrorModel>): void;

  removeEditableProjectFiles(state: ProjectsState, projectId: number): void;

  clearList(state: ProjectsState): void;
}

type ProjectsMutationTree = MutationTree<ProjectsState> & ProjectsMutations;

export const projectsMutations: ProjectsMutationTree = {
  setFilters(state: ProjectsState, filters: ProjectListFiltersModel): void {
    state.listFilters = filters;
  },
  searchListStarted(state: ProjectsState): void {
    state.listLoading = true;
    state.listError = null;
    state.listResults = null;
  },
  searchListError(state: ProjectsState, error: ErrorModel): void {
    state.listError = error;
    state.listLoading = false;
  },
  setListResults(state: ProjectsState, results: ProjectListModel): void {
    state.listResults = results;
    state.listLoading = false;
  },
  updateListResult(state: ProjectsState, results: ProjectListModel): void {
    state.listResults = results;
  },
  editProjectFilesLoading(state: ProjectsState, projectId: number): void {
    state.loadProjectFilesLoading = {
      ...state.loadProjectFilesLoading,
      [projectId]: true
    };
    state.loadProjectFilesError = omit({ ...state.loadProjectFilesError }, projectId);
  },
  editProjectFilesError(state: ProjectsState, projectError: Combinator<number, ErrorModel>): void {
    state.loadProjectFilesError = {
      ...state.loadProjectFilesError,
      [projectError.a]: projectError.b
    };
    state.loadProjectFilesLoading = omit({ ...state.loadProjectFilesLoading }, projectError.a);
  },
  setEditableProjectFiles(state: ProjectsState, projectFiles: ProjectCodeFilesViewModel): void {
    state.editingProjectFiles = {
      ...state.editingProjectFiles,
      [projectFiles.projectId]: projectFiles
    };
    state.loadProjectFilesLoading = omit({ ...state.loadProjectFilesLoading }, projectFiles.projectId);
  },
  updateEditableProjectFiles(state: ProjectsState, projectFiles: ProjectCodeFilesViewModel): void {
    state.editingProjectFiles = {
      ...state.editingProjectFiles,
      [projectFiles.projectId]: projectFiles
    };
  },
  saveProjectFilesStarted(state: ProjectsState, projectId: number): void {
    state.saveProjectFilesLoading = {
      ...state.saveProjectFilesLoading,
      [projectId]: true
    };
    state.saveProjectFilesError = omit({ ...state.saveProjectFilesError }, projectId);
  },
  saveProjectFilesError(state: ProjectsState, projectError: Combinator<number, ErrorModel>): void {
    state.saveProjectFilesError = {
      ...state.saveProjectFilesError,
      [projectError.a]: projectError.b
    };
    state.saveProjectFilesLoading = omit({ ...state.saveProjectFilesLoading }, projectError.a);
  },
  removeEditableProjectFiles(state: ProjectsState, projectId: number): void {
    state.saveProjectFilesError = omit(state.saveProjectFilesError, projectId);
    state.saveProjectFilesLoading = omit(state.saveProjectFilesLoading, projectId);
    state.editingProjectFiles = omit(state.editingProjectFiles, projectId);
  },
  clearList(state: ProjectsState): void {
    state.listResults = null;
    state.listFilters = null;
    state.listError = null;
    state.listLoading = false;
  }
};
