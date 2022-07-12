import { ErrorModel } from '@/models/error.model';
import { ProjectListModel } from '@/models/project/project-list.model';
import { ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectCodeFilesViewModel } from '@/models/project/project-code-files-view.model';
import { ProjectItemDetailsModel } from '@/models/project/project-item.model';

export interface ProjectsState {
  searchListController: AbortController;
  listFilters: ProjectListFiltersModel | null;
  listLoading: boolean;
  listError: ErrorModel | null;
  listResults: ProjectListModel | null;
  editingProjectDetails: Record<number, Partial<ProjectItemDetailsModel>>;
  editingProjectFiles: Record<number, ProjectCodeFilesViewModel>;
  loadProjectFilesLoading: Record<number, true>;
  loadProjectFilesError: Record<number, ErrorModel>;
  saveProjectNameLoading: Record<number, true>;
  saveProjectNameError: Record<number, ErrorModel>;
  saveProjectDescriptionLoading: Record<number, true>;
  saveProjectDescriptionError: Record<number, ErrorModel>;
  saveProjectFilesLoading: Record<number, true>;
  saveProjectFilesError: Record<number, ErrorModel>;
  createProjectLoading: boolean;
  createProjectError: ErrorModel | null;
  deleteProjectLoading: Record<number, true>;
  deleteProjectError: Record<number, ErrorModel>;
}

export const projectsState = (): ProjectsState => ({
  searchListController: new AbortController(),
  listFilters: null,
  listLoading: false,
  listError: null,
  listResults: null,
  editingProjectDetails: {},
  editingProjectFiles: {},
  loadProjectFilesLoading: {},
  loadProjectFilesError: {},
  saveProjectNameLoading: {},
  saveProjectNameError: {},
  saveProjectDescriptionLoading: {},
  saveProjectDescriptionError: {},
  saveProjectFilesLoading: {},
  saveProjectFilesError: {},
  createProjectLoading: false,
  createProjectError: null,
  deleteProjectLoading: {},
  deleteProjectError: {}
});
