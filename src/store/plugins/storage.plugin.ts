import { MutationPayload, Store } from 'vuex';
import { StoreState } from '@/store/store.model';
import { merge, pick } from 'lodash';

const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|(\+\d{2}:?(\d{2})?))?$/;

function rehydrate (data?: Record<string, unknown>): void {
  if (!data) {
    return;
  }

  for (const key of Object.keys(data)) {
    if (typeof data[key] === 'string' && datePattern.test(data[key] as string)) {
      data[key] = new Date(data[key] as string);
    } else if (Array.isArray(data[key])) {
      const elements: unknown[] = data[key] as unknown[];
      for (let i = 0; i < elements.length; i++) {
        const element: unknown = elements[i];
        if (typeof element === 'string' && datePattern.test(element as string)) {
          elements[i] = new Date(element as string);
        } else {
          rehydrate(element as Record<string, unknown>);
        }
      }
    } else if (typeof data[key] === 'object') {
      rehydrate(data[key] as Record<string, unknown>);
    }
  }
}

function injectExcluded (storedState: Record<string, unknown>, defaultState: Record<string, unknown>): void {
  for (const key of Object.keys(defaultState)) {
    storedState[key] = storedState[key] instanceof Object ? merge({}, storedState[key], defaultState[key]) : defaultState[key];
  }
}

export interface StorageOptions {
  localStorageKeys: string[];
  sessionStorageKeys: string[];
}

function readFromStorage (storageKey: string, store: Store<StoreState>): void {
  const rootState: StoreState = {} as StoreState;
  injectExcluded(rootState as unknown as Record<string, unknown>, store.state as unknown as Record<string, unknown>);
  for (const storage of [sessionStorage, localStorage]) {
    const data: string | null = storage.getItem(storageKey);
    if (data) {
      injectExcluded(rootState as unknown as Record<string, unknown>, JSON.parse(data) as unknown as Record<string, unknown>);
    }
  }
  rehydrate(rootState as unknown as Record<string, unknown>);
  store.replaceState(rootState);
}

function saveToStorage (storage: Storage, storageKey: string, storageKeys: string[], state: StoreState): void {
  const sessionState: Partial<StoreState> = pick(state, storageKeys);
  storage.setItem(storageKey, JSON.stringify(sessionState));
}

export default function createStoragePlugin (options: StorageOptions) {
  return (store: Store<StoreState>): void => {
    const storageKey = 'last-impl:storage';

    readFromStorage(storageKey, store);

    store.subscribe((mutation: MutationPayload, state: StoreState) => {
      saveToStorage(localStorage, storageKey, options.localStorageKeys, state);
      saveToStorage(sessionStorage, storageKey, options.sessionStorageKeys, state);
    });
  };
}
