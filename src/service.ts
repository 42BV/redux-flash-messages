import { getConfig, addFlashMessage, removeFlashMessage } from './index';
import {
  FlashMessageConfig,
  OnFlashMessageClicked,
  FlashMessage,
  ExtendableMessageTypes,
  MessageTypes,
} from './models';

let nextFlashMessageId = 1;

// This function does not do anything.
const noop: VoidFunction = (): void => {};

/**
 * Adds a FlashMessage to the Redux Store and removes it after the
 * duration, if the duration is not false.
 *
 * @param type The type of message that is added
 * @param duration How long the message should stay in the Redux store. False for when it never should be removed.
 * @param text The text to render inside the message
 * @param {function} onClick The callback which will be executed when the flash message is clicked, empty by default.
 * @param data The extra data which can be passed to the renderer of the flash message.
 */
export function addFlashMessageOfType<T = ExtendableMessageTypes>(
  type: T,
  duration: number | false,
  text: string,
  onClick: OnFlashMessageClicked = noop,
  data: Record<string, any> = {},
): void {
  const dispatch = getConfig().dispatch;
  const id = nextFlashMessageId;
  const flashMessage: FlashMessage = { id, type, duration, text, onClick, data };

  dispatch(addFlashMessage(flashMessage));

  if (duration !== false) {
    setTimeout(() => {
      dispatch(removeFlashMessage(id));
    }, duration);
  }

  nextFlashMessageId += 1;
}

/**
 * Adds a flash message of the type 'ERROR' on the flash message queue
 * in Redux.
 *
 * @param {FlashMessageConfig} { text, onClick, data }
 */
export function addError({ text, onClick, data }: FlashMessageConfig): void {
  addFlashMessageOfType(MessageTypes.Error, 10000, text, onClick, data);
}

/**
 * Adds a flash message of the type 'WARNING' on the flash message queue
 * in Redux. After 7000 milliseconds it will automatically be removed
 * from the queue.
 *
 * @param {FlashMessageConfig} { text, onClick, data }
 */
export function addWarning({ text, onClick, data }: FlashMessageConfig): void {
  addFlashMessageOfType(MessageTypes.Warning, 7000, text, onClick, data);
}

/**
 * Adds a flash message of the type 'SUCCESS' on the flash message queue
 * in Redux. After 2000 milliseconds it will automatically be removed
 * from the queue.
 *
 * @param {FlashMessageConfig} { text, onClick, data }
 */
export function addSuccess({ text, onClick, data }: FlashMessageConfig): void {
  addFlashMessageOfType(MessageTypes.Success, 2000, text, onClick, data);
}

/**
 * Adds a flash message of the type 'INFO' on the flash message queue
 * in Redux. After 5000 milliseconds it will automatically be removed
 * from the queue.
 *
 * @param {FlashMessageConfig} { text, onClick, data }
 */
export function addInfo({ text, onClick, data }: FlashMessageConfig): void {
  addFlashMessageOfType(MessageTypes.Info, 5000, text, onClick, data);
}

/**
 * Adds a flash message of the type 'APOCALYPSE' on the flash message queue
 * in Redux. This message is never removed from the queue automatically.
 *
 * @param {FlashMessageConfig} { text, onClick, data }
 */
export function addApocalypse({ text, onClick, data }: FlashMessageConfig): void {
  addFlashMessageOfType(MessageTypes.Apocalypse, false, text, onClick, data);
}

// This export is purely for unit testing
export function resetNextFlashMessageId(): void {
  nextFlashMessageId = 1;
}
