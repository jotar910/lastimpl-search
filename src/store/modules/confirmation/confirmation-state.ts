import { ConfirmationOptionsModel } from '@/models/confirmation-options.model';

export interface ConfirmationState {
  open: boolean;
  operation: ConfirmationOptionsModel | null;
}

export const confirmationState = (): ConfirmationState => ({
  open: false,
  operation: null
});
