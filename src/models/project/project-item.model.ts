export interface ProjectItemFileModel {
  id: string;
  name: string;
}

export interface ProjectItemModel {
  id: number;
  name: string;
  description: string;
  updatedAt: number;
  files: ProjectItemFileModel[];
}
