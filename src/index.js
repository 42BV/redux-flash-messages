// @flow

export { configureFlashMessages, getConfig } from './config.js';
export { addError, addWarning, addSuccess, addInfo } from './service.js';
export { flashMessage, addFlashMessage, removeFlashMessage } from './flash-message-reducer.js';

export type { FlashMessageStore } from './flash-message-reducer.js';
export type { FlashMessage, FlashMessageConfig, OnFlashMessageClicked } from './models.js';
