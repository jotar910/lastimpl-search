import { PaginationListModel } from '@/models/pagination-list.model';

export interface CommonListModel<T> extends PaginationListModel {
  data: T[];
}
