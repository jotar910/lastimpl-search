export interface EditableFieldModel<Type> {
  original: Type;
  modified: Type;
  valid: boolean;
  touched: boolean;
}

export function createEditableField<Type>(original: Type, modified?: Type,
  valid: boolean = true, touched: boolean = false): EditableFieldModel<Type> {
  return {
    original,
    modified: modified ?? original,
    valid,
    touched
  };
}
