import { ProjectCodeFileModel } from '@/models/project/project-code-file.model';

export interface ProjectModel {
  id?: number;
  name: string;
  description: string;
  files: ProjectCodeFileModel[];
  tags: string[]; // TODO
}

export function emptyProject(name: string = '', description: string = ''): ProjectModel {
  return {
    name,
    description,
    files: [],
    tags: []
  };
}
