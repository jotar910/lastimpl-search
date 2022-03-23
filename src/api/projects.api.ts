import axios, { AxiosResponse } from 'axios';
import { ProjectListModel } from '@/models/project/project-list.model';
import { ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectCodeFileModel } from '@/models/project/project-code-file.model';

const baseURL: string = process.env.VUE_APP_API_HOST;

class ProjectsApi {
  searchList (controller: AbortController, filters?: ProjectListFiltersModel): Promise<ProjectListModel> {
    return axios.get('projects', {
      baseURL,
      params: {
        q: filters?.query || undefined
      },
      signal: controller.signal
    }).then((result: AxiosResponse<ProjectListModel>) => result.data);
  }

  getProjectFiles (projectId: number): Promise<ProjectCodeFileModel[]> {
    return axios.get(`projects/${projectId}/files`, { baseURL })
      .then((result: AxiosResponse<ProjectCodeFileModel[]>) => result.data);
  }

  saveProjectFiles (projectId: number, files: ProjectCodeFileModel[]): Promise<void> {
    return axios.put(`projects/${projectId}/files`, files, { baseURL })
      .then((result: AxiosResponse<void>) => result.data);
  }
}

const projectsApi: ProjectsApi = new ProjectsApi();
export default projectsApi;
