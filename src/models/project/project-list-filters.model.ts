export interface ProjectListFiltersModel {
  query: string;
}

export function emptyProjectListFilters (): ProjectListFiltersModel {
  return {
    query: ''
  };
}
