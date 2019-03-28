import {
  FlashMessage,
  FlashMessageActions,
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  AddMessageAction,
  RemoveMessageAction,
} from './models';
import { Reducer } from 'redux';

// Actions
export function addFlashMessage(flashMessage: FlashMessage): AddMessageAction {
  return { type: ADD_MESSAGE, flashMessage };
}

export function removeFlashMessage(flashMessageId: number): RemoveMessageAction {
  return { type: REMOVE_MESSAGE, flashMessageId };
}

// Reducer
export interface FlashMessageState {
  messages: FlashMessage[];
}

export const initialState: FlashMessageState = {
  messages: [],
};

export const flashMessage: Reducer<FlashMessageState, FlashMessageActions> = (
  state: FlashMessageState = initialState,
  action: FlashMessageActions,
): FlashMessageState => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const messages = [...state.messages, action.flashMessage];
      return { ...state, messages };
    }

    case REMOVE_MESSAGE: {
      const flashMessageId = action.flashMessageId;

      const messages = state.messages.filter(f => flashMessageId !== f.id);
      return { ...state, messages };
    }

    default: {
      return state;
    }
  }
};
