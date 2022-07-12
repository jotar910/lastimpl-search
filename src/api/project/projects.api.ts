import axios, { AxiosResponse } from 'axios';
import { ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectCodeFileModel } from '@/models/project/project-code-file.model';
import { ProjectItemDetailsModel } from '@/models/project/project-item.model';
import { ProjectListResponse } from '@/responses/project/project-list.response';
import { ProjectModel } from '@/models/project/project.model';

const baseURL: string = process.env.VUE_APP_API_HOST;

class ProjectsApi {
  searchList(controller: AbortController, filters?: ProjectListFiltersModel): Promise<ProjectListResponse> {
    return axios.get('projects', {
      baseURL,
      params: {
        q: filters?.query || undefined
      },
      signal: controller.signal
    }).then((result: AxiosResponse<ProjectListResponse>) => result.data);
  }

  getProjectFiles(projectId: number): Promise<ProjectCodeFileModel[]> {
    return axios.get(`projects/${projectId}/files`, { baseURL })
      .then((result: AxiosResponse<ProjectCodeFileModel[]>) => result.data);
  }

  saveProjectDetail(projectId: number, detail: Partial<ProjectItemDetailsModel>): Promise<void> {
    return axios.patch(`projects/${projectId}`, detail, { baseURL })
      .then((result: AxiosResponse<void>) => result.data);
  }

  saveProjectFiles(projectId: number, files: ProjectCodeFileModel[]): Promise<void> {
    return axios.put(`projects/${projectId}/files`, files, { baseURL })
      .then((result: AxiosResponse<void>) => result.data);
  }

  createNewProject(project: ProjectModel): Promise<ProjectModel> {
    return axios.post('projects', project, { baseURL })
      .then((result: AxiosResponse<ProjectModel>) => result.data);
  }

  deleteProject(projectId: number): Promise<void> {
    return axios.delete(`projects/${projectId}`, { baseURL })
      .then((result: AxiosResponse<void>) => result.data);
  }
}

const projectsApi: ProjectsApi = new ProjectsApi();
export default projectsApi;
