// @flow

import type { FlashMessage } from './models';

export type Action = 
  | { type: 'REDUX_FLASH_MESSAGE.ADD_FLASH_MESSAGE', flashMessage: FlashMessage }
  | { type: 'REDUX_FLASH_MESSAGE.REMOVE_FLASH_MESSAGE', flashMessageId: number };

export type FlashMessageStore = {
  +messages: Array<FlashMessage>
};

export const initialState: FlashMessageStore = {
  messages: [],
};

export function flashMessage(state: FlashMessageStore = initialState, action: Action): FlashMessageStore {
  switch(action.type) {
    case 'REDUX_FLASH_MESSAGE.ADD_FLASH_MESSAGE': {
      const messages = [...state.messages, action.flashMessage];
      return { ...state, messages};
    }

    case 'REDUX_FLASH_MESSAGE.REMOVE_FLASH_MESSAGE': {
      const flashMessageId = action.flashMessageId;

      const messages = state.messages.filter((f) => flashMessageId !== f.id);
      return { ...state, messages };
    }

    default: {
      return state;
    }
  }
}

export function addFlashMessage(flashMessage: FlashMessage): Action {
  return { type: 'REDUX_FLASH_MESSAGE.ADD_FLASH_MESSAGE', flashMessage };
}

export function removeFlashMessage(flashMessageId: number): Action {
  return { type: 'REDUX_FLASH_MESSAGE.REMOVE_FLASH_MESSAGE', flashMessageId };
}
