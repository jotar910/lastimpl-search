import { ProjectsState } from '@/store/modules/projects/projects-state';
import { SearchState } from '@/store/modules/search/search-state';
import { ConfirmationState } from '@/store/modules/confirmation/confirmation-state';
import { ToastState } from '@/store/modules/toast/toast-state';

export interface StoreState {
  darkMode: boolean;
  confirmation: ConfirmationState;
  projects: ProjectsState;
  search: SearchState;
  toast: ToastState;
}

export default (): StoreState => ({
  darkMode: false
}) as StoreState;
