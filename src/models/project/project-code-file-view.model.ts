import { UUID } from '@/utils/uuid.utils';
import { ProjectCodeFileModel } from '@/models/project/project-code-file.model';

export interface ProjectCodeFileViewModel extends ProjectCodeFileModel {
  internalId: string;
}

export function emptyProjectCodeFileView(name: string = ''): ProjectCodeFileViewModel {
  return {
    name,
    content: '',
    internalId: UUID.v4()
  };
}
