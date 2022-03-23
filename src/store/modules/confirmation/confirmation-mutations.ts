import { MutationTree } from 'vuex';
import { ConfirmationState } from '@/store/modules/confirmation/confirmation-state';
import { ConfirmationOptionsModel } from '@/models/confirmation-options.model';

interface ConfirmationMutations {
  open(state: ConfirmationState, operation: ConfirmationOptionsModel): void;

  close(state: ConfirmationState): void;
}

type ConfirmationMutationTree = MutationTree<ConfirmationState> & ConfirmationMutations;

export const confirmationMutations: ConfirmationMutationTree = {
  open(state: ConfirmationState, operation: ConfirmationOptionsModel): void {
    state.operation = operation;
    state.open = true;
  },
  close(state: ConfirmationState): void {
    state.open = false;
    state.operation = null;
  }
};
