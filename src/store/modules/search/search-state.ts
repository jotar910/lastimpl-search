import { ProjectListModel } from '@/models/project/project-list.model'
import { ErrorModel } from '@/models/error.model'

export interface SearchState {
  controller: AbortController;
  query: string | null,
  querying: boolean;
  error: ErrorModel | null;
  results: ProjectListModel | null;
}

export const searchState = (): SearchState => ({
  controller: new AbortController(),
  query: null,
  querying: false,
  error: null,
  results: null
})
