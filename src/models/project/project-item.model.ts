import { Combinator } from '@/utils/types.utils';
import { EditableFieldModel } from '@/models/editable-field.model';

export interface ProjectItemFileModel {
  id: number;
  name: string;
}

export interface ProjectItemDetailsModel {
  name: string;
  description: string;
}

export type ProjectItemEditableDetailsModel = {
  [key in keyof ProjectItemDetailsModel]: EditableFieldModel<ProjectItemDetailsModel[key]>
};

export interface ProjectItemModel extends ProjectItemEditableDetailsModel {
  id: number;
  updatedAt: number;
  files: ProjectItemFileModel[];
}

export type ProjectItemContext = Combinator<ProjectItemModel, number, 'item', 'idx'>;
