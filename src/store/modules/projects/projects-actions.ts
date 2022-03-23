import { ActionContext, ActionTree } from 'vuex';
import projectsApi from '@/api/projects.api';
import { StoreState } from '@/store/store.model';
import { ProjectsState } from '@/store/modules/projects/projects-state';
import { ProjectListModel } from '@/models/project/project-list.model';
import { emptyProjectListFilters, ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectCodeFileModel } from '@/models/project/project-code-file.model';
import { Combinator } from '@/utils/types.utils';
import {
  createProjectCodeFilesView,
  findProjectFileIndex,
  ProjectCodeFilesViewModel,
  updateProjectFile
} from '@/models/project/project-code-files-view.model';
import { ProjectItemModel } from '@/models/project/project-item.model';
import { emptyProjectCodeFileView, ProjectCodeFileViewModel } from '@/models/project/project-code-file-view.model';
import { mapToProjectCodeFile, mapToProjectCodeFileView } from '@/utils/projects/project.mappers';
import { newToastError } from '@/models/toast-options.model';

interface ProjectsActions {
  updateFilters(context: ActionContext<ProjectsState, StoreState>, filters: Partial<ProjectListFiltersModel>): void;

  searchList(context: ActionContext<ProjectsState, StoreState>, filters: ProjectListFiltersModel): Promise<void>;

  addFile(context: ActionContext<ProjectsState, StoreState>, project: ProjectItemModel): Promise<void>;

  editFile(context: ActionContext<ProjectsState, StoreState>, projectFileId: Combinator<ProjectItemModel, number>): Promise<void>;

  editFileName(context: ActionContext<ProjectsState, StoreState>, projectFileName: Combinator<Combinator<number, string, 'projectId', 'fileId'>, string>): void;

  editFileContent(context: ActionContext<ProjectsState, StoreState>, projectFileName: Combinator<Combinator<number, string, 'projectId', 'fileId'>, string>): void;

  selectNewFile(context: ActionContext<ProjectsState, StoreState>, projectId: number): void;

  selectFile(context: ActionContext<ProjectsState, StoreState>, projectCodeFile: Combinator<number, string>): void;

  removeFile(context: ActionContext<ProjectsState, StoreState>, projectCodeFile: Combinator<number, string>): void;

  updateSelectedFile(context: ActionContext<ProjectsState, StoreState>,
    projectFileContent: Combinator<number, Combinator<number, string, 'fileId', 'content'>, 'project', 'file'>): void;

  saveProjectFiles(context: ActionContext<ProjectsState, StoreState>, projectId: number): Promise<void>;
}

export const projectsActions: ActionTree<ProjectsState, StoreState> & ProjectsActions = {
  updateFilters(context: ActionContext<ProjectsState, StoreState>, filters: Partial<ProjectListFiltersModel>): void {
    context.commit('setFilters', {
      ...context.state.listFilters ?? emptyProjectListFilters(),
      ...filters
    });
  },
  async searchList(context: ActionContext<ProjectsState, StoreState>, filters?: ProjectListFiltersModel): Promise<void> {
    const filtersData: ProjectListFiltersModel = filters ?? emptyProjectListFilters();
    if (context.state.listLoading) {
      context.state.searchListController.abort();
    }
    context.commit('searchListStarted');
    context.commit('setFilters', filtersData);
    try {
      const projects: ProjectListModel = await projectsApi.searchList(context.state.searchListController, filtersData);
      const editingProjectsSet: Set<string> = new Set<string>(Object.keys(context.state.editingProjectFiles));
      for (const item of projects.data) {
        editingProjectsSet.delete(item.id.toString());
      }
      const editingProjects: ProjectItemModel[] = [];
      for (const id of editingProjectsSet) {
        editingProjects.push(context.state.editingProjectFiles[+id].project);
      }
      projects.data = [...editingProjects, ...projects.data];
      context.commit('setListResults', projects);
    } catch (e) {
      // TODO: log the error
      context.commit('searchListError', e);
    }
  },
  async addFile(context: ActionContext<ProjectsState, StoreState>, project: ProjectItemModel): Promise<void> {
    const projectId: number = project.id;
    context.commit('editProjectFilesLoading', projectId);
    try {
      const files: ProjectCodeFileModel[] = await projectsApi.getProjectFiles(projectId);
      const newFile: ProjectCodeFileViewModel = emptyProjectCodeFileView();
      context.commit('setEditableProjectFiles', createProjectCodeFilesView(projectId, project,
        [...mapToProjectCodeFileView(files), newFile], newFile.internalId));
    } catch (e) {
      // TODO: log the error
      context.commit('editProjectFilesError', {
        a: projectId,
        b: e
      });
    }
  },
  async editFile(context: ActionContext<ProjectsState, StoreState>, projectFileId: Combinator<ProjectItemModel, number>): Promise<void> {
    const projectId: number = projectFileId.a.id;
    context.commit('editProjectFilesLoading', projectFileId.a);
    try {
      const files: ProjectCodeFileModel[] = await projectsApi.getProjectFiles(projectId);
      const viewFiles: ProjectCodeFileViewModel[] = mapToProjectCodeFileView(files);
      const selectedFile: ProjectCodeFileViewModel | undefined = viewFiles
        .find((codeFile: ProjectCodeFileViewModel) => codeFile.id === projectFileId.b);
      context.commit('setEditableProjectFiles', createProjectCodeFilesView(projectId, projectFileId.a,
        viewFiles, selectedFile?.internalId));
    } catch (e) {
      // TODO: log the error
      context.commit('editProjectFilesError', {
        a: projectFileId.a,
        b: e
      });
    }
  },
  editFileName(context: ActionContext<ProjectsState, StoreState>, projectFileName: Combinator<Combinator<number, string, 'projectId', 'fileId'>, string>): void {
    context.commit('setEditableProjectFiles', updateProjectFile(context.getters.editingFiles(projectFileName.a.projectId),
      projectFileName.a.fileId, { name: projectFileName.b }));
  },
  editFileContent(context: ActionContext<ProjectsState, StoreState>, projectFileName: Combinator<Combinator<number, string, 'projectId', 'fileId'>, string>): void {
    context.commit('setEditableProjectFiles', updateProjectFile(context.getters.editingFiles(projectFileName.a.projectId),
      projectFileName.a.fileId, { content: projectFileName.b }));
  },
  selectNewFile(context: ActionContext<ProjectsState, StoreState>, projectId: number): void {
    const curFileState: ProjectCodeFilesViewModel = context.getters.editingFiles(projectId);
    const newFile: ProjectCodeFileViewModel = emptyProjectCodeFileView();
    context.commit('setEditableProjectFiles', {
      ...curFileState,
      cur: [...curFileState.cur, newFile],
      selectedId: newFile.internalId
    } as ProjectCodeFilesViewModel);
  },
  selectFile(context: ActionContext<ProjectsState, StoreState>, projectCodeFile: Combinator<number, string>): void {
    const curFileState: ProjectCodeFilesViewModel = context.getters.editingFiles(projectCodeFile.a);
    context.commit('setEditableProjectFiles', {
      ...curFileState,
      selectedId: projectCodeFile.b
    } as ProjectCodeFilesViewModel);
  },
  removeFile(context: ActionContext<ProjectsState, StoreState>, projectCodeFile: Combinator<number, string>): void {
    const editingProject: ProjectCodeFilesViewModel = context.getters.editingFiles(projectCodeFile.a);
    const selectIdx: number = findProjectFileIndex(editingProject, projectCodeFile.b);
    const curProjects: ProjectCodeFileViewModel[] = [
      ...editingProject.cur.slice(0, selectIdx),
      ...editingProject.cur.slice(selectIdx + 1)
    ];
    if (!curProjects.length) {
      curProjects.push(emptyProjectCodeFileView());
    }
    context.commit('setEditableProjectFiles', {
      ...editingProject,
      cur: curProjects,
      selectedId: curProjects[Math.min(selectIdx, curProjects.length - 1)].internalId
    } as ProjectCodeFilesViewModel);
  },
  updateSelectedFile(context: ActionContext<ProjectsState, StoreState>,
    projectFileContent: Combinator<number, Combinator<number, string, 'fileId', 'content'>, 'project', 'file'>): void {
    const curFileState: ProjectCodeFilesViewModel = context.getters.editingFiles(projectFileContent.project);
    const fileIdx: number = projectFileContent.file.fileId;
    const selectFile: ProjectCodeFileViewModel = curFileState.cur[fileIdx];
    context.commit('setEditableProjectFiles', {
      ...curFileState,
      cur: [
        ...curFileState.cur.slice(0, fileIdx),
        {
          ...selectFile,
          content: projectFileContent.file.content
        },
        ...curFileState.cur.slice(fileIdx + 1)
      ],
      selected: selectFile
    });
  },
  async saveProjectFiles(context: ActionContext<ProjectsState, StoreState>, projectId: number): Promise<void> {
    context.commit('saveProjectFilesStarted', projectId);
    try {
      const editingFiles: ProjectCodeFilesViewModel = context.getters.editingFiles(projectId);
      await projectsApi.saveProjectFiles(projectId, mapToProjectCodeFile(editingFiles.cur));
      const projectList: ProjectListModel = await projectsApi.searchList(context.state.searchListController, context.state.listFilters!);
      context.commit('updateListResult', projectList);
      context.commit('removeEditableProjectFiles', projectId);
    } catch (e) {
      // TODO: log the error
      context.commit('saveProjectFilesError', {
        a: projectId,
        b: e
      });
      context.commit('toast/add', newToastError('common.error',
        'errors.saveFiles'), { root: true });
    }
  }
};
