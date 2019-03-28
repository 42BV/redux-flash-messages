import { Action } from 'redux';

export enum MessageTypes {
  Error = 'ERROR',
  Warning = 'WARNING',
  Success = 'SUCCESS',
  Info = 'INFO',
  Apocalypse = 'APOCALYPSE',
}

export type ExtendableMessageTypes<T = {}> = T | MessageTypes;
export type OnFlashMessageClicked = (msg: FlashMessage) => void;

export interface FlashMessage<T = ExtendableMessageTypes> {
  // The id of the flashMessage must be unique for each flash message.
  id: number;

  /*
    The type of flash message, can be useful to distinguish
    between types of messages. For example you might have a type
    'error', 'warning' or 'info'.
  */
  type: T;

  // The text message you want to show to the user.
  text: string;

  // How long a flash message should be should to the user.
  duration: number | false;

  /*
    What needs to happen when the message is clicked. Should
    receive the FlashMessage which is clicked.
  */
  onClick: OnFlashMessageClicked;

  /*
    This 'data' object can be used to store any custom data you want to
    associate with the Flash Message. The data 'key' will never
    be used / manipulated now and in the future.
  */
  data: Record<string, any>;
}

export interface FlashMessageConfig {
  // The text message you want to show to the user.
  text: string;

  /*
    What needs to happen when the message is clicked. Should
    receive the FlashMessage which is clicked.
  */
  onClick?: OnFlashMessageClicked;

  /*
    This 'data' object can be used to store any custom data you want to
    associate with the Flash Message. The data 'key' will never
    be used / manipulated now and in the future.
  */
  data?: Record<string, any>;
}

// Redux store types
export const ADD_MESSAGE = 'REDUX_FLASH_MESSAGE.ADD_FLASH_MESSAGE';
export const REMOVE_MESSAGE = 'REDUX_FLASH_MESSAGE.REMOVE_FLASH_MESSAGE';

export interface AddMessageAction extends Action<typeof ADD_MESSAGE> {
  flashMessage: FlashMessage;
}

export interface RemoveMessageAction extends Action<typeof REMOVE_MESSAGE> {
  flashMessageId: number;
}

export type FlashMessageActions = AddMessageAction | RemoveMessageAction;
