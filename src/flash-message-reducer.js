// @flow

import type { FlashMessage } from './models';

type Action = {
  type: string,
  payload: any
};

export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
export const REMOVE_FLASH_MESSAGE = 'REMOVE_MESSAGE';

export type FlashMessageStore = {
  messages: Array<FlashMessage>
};

export const initialState: FlashMessageStore = {
  messages: [],
};

export function flashMessage(state: FlashMessageStore = initialState, action: Action): FlashMessageStore {
  switch(action.type) {
    case ADD_FLASH_MESSAGE: {
      const messages = [...state.messages, action.payload.flashMessage];
      return { ...state, messages};
    }

    case REMOVE_FLASH_MESSAGE: {
      const flashMessageId = action.payload.flashMessageId;

      const messages = state.messages.filter((f) => flashMessageId !== f.id);
      return { ...state, messages };
    }

    default: {
      return state;
    }
  }
}

export function addFlashMessage(flashMessage: FlashMessage): Action {
  return { type: ADD_FLASH_MESSAGE, payload: { flashMessage } };
}

export function removeFlashMessage(flashMessageId: number): Action {
  return { type: REMOVE_FLASH_MESSAGE, payload: { flashMessageId } };
}
