import axios, { AxiosResponse } from 'axios'
import { ProjectListModel } from '@/models/project/project-list.model'

const baseURL: string = process.env.VUE_APP_API_HOST

class SearchApi {
  search (q: string, controller: AbortController): Promise<ProjectListModel> {
    return axios.get('projects', {
      baseURL,
      params: { q },
      signal: controller.signal
    }).then((result: AxiosResponse<ProjectListModel>) => result.data)
  }
}

const searchApi: SearchApi = new SearchApi()
export default searchApi
