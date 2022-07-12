import { ActionContext, ActionTree } from 'vuex';
import projectsApi from '@/api/project/projects.api';
import { StoreState } from '@/store/store.model';
import { ProjectsState } from '@/store/modules/projects/projects-state';
import { emptyProjectListFilters, ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectCodeFileModel } from '@/models/project/project-code-file.model';
import { Combinator, newCombinedValue } from '@/utils/types.utils';
import {
  createProjectCodeFilesView,
  findProjectFileIndex,
  ProjectCodeFilesViewModel,
  updateProjectFile
} from '@/models/project/project-code-files-view.model';
import { ProjectItemContext, ProjectItemDetailsModel, ProjectItemModel } from '@/models/project/project-item.model';
import { emptyProjectCodeFileView, ProjectCodeFileViewModel } from '@/models/project/project-code-file-view.model';
import { mapToProjectCodeFile, mapToProjectCodeFileView } from '@/utils/projects/project.mappers';
import { newToastError } from '@/models/toast-options.model';
import { omit } from 'lodash';
import { ProjectListResponse } from '@/responses/project/project-list.response';
import { ProjectsMappers } from '@/api/project/projects.mappers';
import { ProjectListModel } from '@/models/project/project-list.model';
import { emptyProject, ProjectModel } from '@/models/project/project.model';
import { globalI18n } from '@/i18n';
import { UUID } from '@/utils/uuid.utils';
import { createEditableField } from '@/models/editable-field.model';

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
      const projects: ProjectListResponse = await projectsApi.searchList(context.state.searchListController, filtersData);
      context.commit('setListResults', ProjectsMappers.mapProjectList(projects, context.state.editingProjectFiles,
        context.state.editingProjectDetails));
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
  async saveProjectName(context: ActionContext<ProjectsState, StoreState>, projectContextName: Combinator<ProjectItemContext, string>): Promise<void> {
    const projectId: number = projectContextName.a.item.id;
    context.commit('saveProjectNameStarted', projectId);
    try {
      await projectsApi.saveProjectDetail(projectId, { name: projectContextName.b });
      context.commit('saveProjectNameStopped', newCombinedValue(projectId, projectContextName.a.idx));
      context.dispatch('clearEditingProjectName', projectId);
    } catch (error: unknown) {
      // TODO: log the error
      context.commit('updateEditableProjectDetails', {
        a: projectId,
        b: {
          ...context.getters.editingDetails(projectId) ?? {},
          name: projectContextName.b
        }
      });
      context.commit('saveProjectNameError', {
        a: projectId,
        b: error
      });
      context.commit('toast/add', newToastError('common.error',
        'errors.saveProjectName'), { root: true });
    }
  },
  async saveProjectDescription(context: ActionContext<ProjectsState, StoreState>, projectContextDescription: Combinator<ProjectItemContext, string>): Promise<void> {
    const projectId: number = projectContextDescription.a.item.id;
    context.commit('saveProjectDescriptionStarted', projectId);
    try {
      await projectsApi.saveProjectDetail(projectId, { description: projectContextDescription.b });
      context.commit('saveProjectDescriptionStopped', newCombinedValue(projectId, projectContextDescription.a.idx));
      context.dispatch('clearEditingProjectDescription', projectId);
    } catch (error: unknown) {
      // TODO: log the error
      context.commit('updateEditableProjectDetails', {
        a: projectId,
        b: {
          ...context.getters.editingDetails(projectId) ?? {},
          description: projectContextDescription.b
        }
      });
      context.commit('saveProjectDescriptionError', {
        a: projectId,
        b: error
      });
      context.commit('toast/add', newToastError('common.error',
        'errors.saveProjectDescription'), { root: true });
    }
  },
  clearEditingProjectName(context: ActionContext<ProjectsState, StoreState>, projectId: number): void {
    const editingDetails: Partial<ProjectItemDetailsModel> = context.getters.editingDetails(projectId) ?? {};
    if (editingDetails.name === undefined) {
      return;
    }
    if (Object.keys(editingDetails).length === 1) {
      context.commit('removeEditableProjectDetails', projectId);
      return;
    }
    context.commit('updateEditableProjectDetails', newCombinedValue(projectId, omit(editingDetails, 'name')));
  },
  clearEditingProjectDescription(context: ActionContext<ProjectsState, StoreState>, projectId: number): void {
    const editingDetails: Partial<ProjectItemDetailsModel> = context.getters.editingDetails(projectId) ?? {};
    if (editingDetails.description === undefined) {
      return;
    }
    if (Object.keys(editingDetails).length === 1) {
      context.commit('removeEditableProjectDetails', projectId);
      return;
    }
    context.commit('updateEditableProjectDetails', newCombinedValue(projectId, omit(editingDetails, 'description')));
  },
  async saveProjectFiles(context: ActionContext<ProjectsState, StoreState>, projectId: number): Promise<void> {
    context.commit('saveProjectFilesStarted', projectId);
    try {
      const editingFiles: ProjectCodeFilesViewModel = context.getters.editingFiles(projectId);
      await projectsApi.saveProjectFiles(projectId, mapToProjectCodeFile(editingFiles.cur));
      const projectList: ProjectListResponse = await projectsApi.searchList(context.state.searchListController, context.state.listFilters!);
      context.commit('updateListResult', ProjectsMappers.mapProjectList(projectList, context.state.editingProjectFiles,
        context.state.editingProjectDetails));
      context.commit('removeEditableProjectFiles', projectId);
    } catch (error: unknown) {
      // TODO: log the error
      context.commit('saveProjectFilesError', {
        a: projectId,
        b: error
      });
      context.commit('toast/add', newToastError('common.error',
        'errors.saveFiles'), { root: true });
    }
  },
  async createNewProject(context: ActionContext<ProjectsState, StoreState>): Promise<void> {
    context.commit('createProjectStarted');
    try {
      const newProject: ProjectModel = await projectsApi.createNewProject(
        emptyProject(globalI18n.t('project.defaults.name', { random: UUID.v4() }), globalI18n.t('project.defaults.description'))
      );
      context.commit('updateListResult', {
        ...context.getters.listResults,
        data: [
          {
            ...newProject,
            name: createEditableField(newProject.name),
            description: createEditableField(newProject.name)
          },
          ...context.getters.listResults.data
        ]
      } as ProjectListModel);
      context.commit('createProjectStopped');
    } catch (error: unknown) {
      // TODO: log the error
      context.commit('createProjectError', error);
      context.commit('toast/add', newToastError('common.error',
        'errors.createProject'), { root: true });
    }
  },
  async deleteProject(context: ActionContext<ProjectsState, StoreState>, projectId: number): Promise<void> {
    context.commit('deleteProjectStarted', projectId);
    try {
      await projectsApi.deleteProject(projectId);
      context.commit('updateListResult', {
        ...context.getters.listResults,
        data: context.getters.listResults.data.filter((project: ProjectItemModel) => project.id !== projectId)
      } as ProjectListModel);
      context.commit('deleteProjectStopped');
    } catch (error: unknown) {
      // TODO: log the error
      context.commit('deleteProjectError', error);
      context.commit('toast/add', newToastError('common.error',
        'errors.deleteProject'), { root: true });
    }
  }
};
