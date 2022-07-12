import { ProjectListResponse } from '@/responses/project/project-list.response';
import { ProjectListModel } from '@/models/project/project-list.model';
import { ProjectItemDetailsModel, ProjectItemModel } from '@/models/project/project-item.model';
import { ProjectCodeFilesViewModel } from '@/models/project/project-code-files-view.model';
import { emptyPaginationList, PaginationListModel } from '@/models/pagination-list.model';
import { createEditableField } from '@/models/editable-field.model';
import { ProjectItemResponse } from '@/responses/project/project-item.response';
import { keys, pick } from 'lodash';

export class ProjectsMappers {
  static mapProjectList(list: ProjectListResponse, editingProjectFiles: Record<number, ProjectCodeFilesViewModel>,
    editingProjectDetails: Record<number, Partial<ProjectItemDetailsModel>>): ProjectListModel {
    const projects: ProjectListModel = {
      ...pick(list, keys(emptyPaginationList())) as PaginationListModel,
      data: list.data.map((project: ProjectItemResponse) => ProjectsMappers.mapProjectItem(project, editingProjectDetails))
    };
    const editingProjectsSet: Set<number> = new Set<number>(Object.keys(editingProjectFiles).map(Number));
    for (const item of projects.data) {
      editingProjectsSet.delete(item.id);
    }
    const editingProjects: ProjectItemModel[] = [];
    for (const id of editingProjectsSet) {
      editingProjects.push(editingProjectFiles[id].project);
    }
    projects.data = [...editingProjects, ...projects.data];
    return projects;
  }

  private static mapProjectItem(project: ProjectItemResponse, editingProjectDetails: Record<number, Partial<ProjectItemDetailsModel>> = {}): ProjectItemModel {
    return {
      ...project,
      name: createEditableField(project.name, editingProjectDetails[project.id]?.name ?? project.name),
      description: createEditableField(project.description, editingProjectDetails[project.id]?.description ?? project.description)
    };
  }
}
