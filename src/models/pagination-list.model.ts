export interface PaginationListModel {
  totalItems: number;
  totalPages: number;
  page: number;
  count: number;
}

export function emptyPaginationList(): PaginationListModel {
  return {
    totalItems: 0,
    totalPages: 0,
    page: 0,
    count: 0
  };
}
