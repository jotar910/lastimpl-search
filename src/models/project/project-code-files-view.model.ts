import { ChangeCombinator } from '@/utils/types.utils';
import { ProjectItemModel } from '@/models/project/project-item.model';
import { ProjectCodeFileViewModel } from '@/models/project/project-code-file-view.model';

export interface ProjectCodeFilesViewModel extends ChangeCombinator<ProjectCodeFileViewModel[]> {
  projectId: number;
  project: ProjectItemModel;
  selectedId: string;
  changes: boolean;
}

export function createProjectCodeFilesView(projectId: number, project: ProjectItemModel,
  codeFiles: ProjectCodeFileViewModel[], selected?: string): ProjectCodeFilesViewModel {
  return {
    projectId,
    project,
    cur: codeFiles,
    prev: { ...codeFiles },
    changes: false,
    selectedId: selected ?? codeFiles[0].internalId
  };
}

export function updateProjectFile(editingProject: ProjectCodeFilesViewModel,
  fileId: string, file: Partial<ProjectCodeFileViewModel>): ProjectCodeFilesViewModel {
  const fileIdx: number = findProjectFileIndex(editingProject, fileId);
  return {
    ...editingProject,
    cur: [
      ...editingProject.cur.slice(0, fileIdx),
      {
        ...editingProject.cur[fileIdx],
        ...file
      },
      ...editingProject.cur.slice(fileIdx + 1)
    ]
  };
}

export function findProjectFile(editingProject: ProjectCodeFilesViewModel, fileId: string): ProjectCodeFileViewModel {
  return editingProject.cur.find((codeFile: ProjectCodeFileViewModel) => codeFile.internalId === fileId) as ProjectCodeFileViewModel;
}

export function findProjectFileIndex(editingProject: ProjectCodeFilesViewModel, fileId: string): number {
  return editingProject.cur.findIndex((codeFile: ProjectCodeFileViewModel) => codeFile.internalId === fileId);
}
