import { GetterTree } from 'vuex';
import { StoreState } from '@/store/store.model';
import { ConfirmationState } from '@/store/modules/confirmation/confirmation-state';
import { ConfirmationOptionsModel } from '@/models/confirmation-options.model';

interface ConfirmationGetters {
  open (state: ConfirmationState): boolean;

  operation (state: ConfirmationState): ConfirmationOptionsModel | null;
}

export const confirmationGetters: GetterTree<ConfirmationState, StoreState> & ConfirmationGetters = {
  open: (state: ConfirmationState): boolean => state.open,
  operation: (state: ConfirmationState): ConfirmationOptionsModel | null => state.operation
};
