export interface ProjectItemFileModel {
  id: number;
  name: string;
}

export interface ProjectItemModel {
  id: number;
  name: string;
  description: string;
  updatedAt: number;
  files: ProjectItemFileModel[];
}
