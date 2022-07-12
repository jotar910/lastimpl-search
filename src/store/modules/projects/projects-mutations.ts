import { MutationTree } from 'vuex';
import { omit } from 'lodash';
import { ProjectsState } from '@/store/modules/projects/projects-state';
import { ErrorModel } from '@/models/error.model';
import { ProjectListModel } from '@/models/project/project-list.model';
import { ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectCodeFilesViewModel } from '@/models/project/project-code-files-view.model';
import { Combinator } from '@/utils/types.utils';
import { ProjectItemDetailsModel } from '@/models/project/project-item.model';

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
  updateProjectName(state: ProjectsState, idxName: Combinator<number, string>): void {
    state.listResults!.data[idxName.a].name.modified = idxName.b;
  },
  resetProjectName(state: ProjectsState, idx: number): void {
    state.listResults!.data[idx].name.modified = state.listResults!.data[idx].name.original;
  },
  updateProjectDescription(state: ProjectsState, idxDescription: Combinator<number, string>): void {
    state.listResults!.data[idxDescription.a].description.modified = idxDescription.b;
  },
  resetProjectDescription(state: ProjectsState, idx: number): void {
    state.listResults!.data[idx].description.modified = state.listResults!.data[idx].description.original;
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
  updateEditableProjectDetails(state: ProjectsState, projectDetails: Combinator<number, ProjectItemDetailsModel>): void {
    state.editingProjectDetails = {
      ...state.editingProjectDetails,
      [projectDetails.a]: projectDetails.b
    };
  },
  removeEditableProjectDetails(state: ProjectsState, projectId: number): void {
    state.editingProjectDetails = omit({ ...state.editingProjectDetails }, projectId);
  },
  saveProjectNameStarted(state: ProjectsState, projectId: number): void {
    state.saveProjectNameLoading = {
      ...state.saveProjectNameLoading,
      [projectId]: true
    };
    state.saveProjectNameError = omit({ ...state.saveProjectNameError }, projectId);
  },
  saveProjectNameStopped(state: ProjectsState, idIdx: Combinator<number, number>): void {
    state.listResults!.data[idIdx.b].name.original = state.listResults!.data[idIdx.b].name.modified;
    state.saveProjectNameLoading = omit({ ...state.saveProjectNameLoading }, idIdx.a);
  },
  saveProjectNameError(state: ProjectsState, projectError: Combinator<number, ErrorModel>): void {
    state.saveProjectNameError = {
      ...state.saveProjectNameError,
      [projectError.a]: projectError.b
    };
    state.saveProjectNameLoading = omit({ ...state.saveProjectNameLoading }, projectError.a);
  },
  saveProjectDescriptionStarted(state: ProjectsState, projectId: number): void {
    state.saveProjectDescriptionLoading = {
      ...state.saveProjectDescriptionLoading,
      [projectId]: true
    };
    state.saveProjectDescriptionError = omit({ ...state.saveProjectDescriptionError }, projectId);
  },
  saveProjectDescriptionStopped(state: ProjectsState, idIdx: Combinator<number, number>): void {
    state.listResults!.data[idIdx.b].description.original = state.listResults!.data[idIdx.b].description.modified;
    state.saveProjectDescriptionLoading = omit({ ...state.saveProjectDescriptionLoading }, idIdx.a);
  },
  saveProjectDescriptionError(state: ProjectsState, projectError: Combinator<number, ErrorModel>): void {
    state.saveProjectDescriptionError = {
      ...state.saveProjectDescriptionError,
      [projectError.a]: projectError.b
    };
    state.saveProjectDescriptionLoading = omit({ ...state.saveProjectDescriptionLoading }, projectError.a);
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
  createProjectStarted(state: ProjectsState): void {
    state.createProjectLoading = true;
    state.createProjectError = null;
  },
  createProjectStopped(state: ProjectsState): void {
    state.createProjectLoading = false;
  },
  createProjectError(state: ProjectsState, error: ErrorModel): void {
    state.createProjectError = error;
    state.createProjectLoading = false;
  },
  deleteProjectStarted(state: ProjectsState, projectId: number): void {
    state.deleteProjectLoading = {
      ...state.deleteProjectLoading,
      [projectId]: true
    };
    state.deleteProjectError = omit(state.deleteProjectError, projectId);
  },
  deleteProjectStopped(state: ProjectsState, projectId: number): void {
    state.deleteProjectLoading = omit(state.deleteProjectLoading, projectId);
  },
  deleteProjectError(state: ProjectsState, projectError: Combinator<number, ErrorModel>): void {
    state.deleteProjectError = {
      ...state.deleteProjectError,
      [projectError.a]: projectError.b
    };
    state.deleteProjectLoading = omit(state.deleteProjectLoading, projectError.a);
  },
  clearList(state: ProjectsState): void {
    state.listResults = null;
    state.listFilters = null;
    state.listError = null;
    state.listLoading = false;
  }
};
