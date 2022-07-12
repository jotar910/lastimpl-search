import { CommonListModel } from '@/models/common-list.model';
import { ProjectItemResponse } from '@/responses/project/project-item.response';

export type ProjectListResponse = CommonListModel<ProjectItemResponse>;
