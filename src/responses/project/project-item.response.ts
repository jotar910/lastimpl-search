import { ProjectItemFileModel } from '@/models/project/project-item.model';

export interface ProjectItemResponse {
  id: number;
  name: string;
  description: string;
  updatedAt: number;
  files: ProjectItemFileModel[];
}
