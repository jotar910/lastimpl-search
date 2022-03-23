import { UUID } from '@/utils/uuid.utils';
import { ProjectCodeFileModel } from '@/models/project/project-code-file.model';

export interface ProjectCodeFileViewModel extends ProjectCodeFileModel {
  internalId: string;
}

export function emptyProjectCodeFileView(): ProjectCodeFileViewModel {
  return {
    internalId: UUID.v4(),
    name: '',
    content: ''
  };
}
