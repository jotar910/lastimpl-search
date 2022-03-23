import { ErrorModel } from '@/models/error.model';
import { ProjectListModel } from '@/models/project/project-list.model';
import { ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectCodeFilesViewModel } from '@/models/project/project-code-files-view.model';

export interface ProjectsState {
  searchListController: AbortController;
  listFilters: ProjectListFiltersModel | null;
  listLoading: boolean;
  listError: ErrorModel | null;
  listResults: ProjectListModel | null;
  editingProjectFiles: Record<number, ProjectCodeFilesViewModel>;
  loadProjectFilesLoading: Record<number, true>;
  loadProjectFilesError: Record<number, ErrorModel>;
  saveProjectFilesLoading: Record<number, true>;
  saveProjectFilesError: Record<number, ErrorModel>;
}

export const projectsState = (): ProjectsState => ({
  searchListController: new AbortController(),
  listFilters: null,
  listLoading: false,
  listError: null,
  listResults: null,
  editingProjectFiles: {},
  loadProjectFilesLoading: {},
  loadProjectFilesError: {},
  saveProjectFilesLoading: {},
  saveProjectFilesError: {}
});
