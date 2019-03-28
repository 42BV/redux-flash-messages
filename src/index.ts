export { configureFlashMessages, getConfig } from './config';
export { addError, addWarning, addSuccess, addInfo, addApocalypse, addFlashMessageOfType } from './service';
export {
  FlashMessageState as FlashMessageStore,
  flashMessage,
  addFlashMessage,
  removeFlashMessage,
} from './flash-message-reducer';
export {
  FlashMessage,
  FlashMessageConfig,
  OnFlashMessageClicked,
  AddMessageAction,
  RemoveMessageAction,
  MessageTypes,
} from './models';
