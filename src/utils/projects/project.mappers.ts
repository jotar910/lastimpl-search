import { omit } from 'lodash';
import { UUID } from '@/utils/uuid.utils';
import { ProjectCodeFileModel } from '@/models/project/project-code-file.model';
import { ProjectCodeFileViewModel } from '@/models/project/project-code-file-view.model';

export function mapToProjectCodeFile(codeFiles: ProjectCodeFileViewModel[]): ProjectCodeFileModel[] {
  return codeFiles.map((codeFile: ProjectCodeFileViewModel) => omit(codeFile, 'internalId'));
}

export function mapToProjectCodeFileView(codeFiles: ProjectCodeFileModel[]): ProjectCodeFileViewModel[] {
  return codeFiles.map((codeFile: ProjectCodeFileModel) => ({
    ...codeFile,
    internalId: UUID.v4()
  }));
}
