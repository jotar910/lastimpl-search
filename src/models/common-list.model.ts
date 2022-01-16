export interface CommonListModel<T> {
  totalItems: number;
  totalPages: number;
  page: number;
  count: number;
  data: T[];
}
