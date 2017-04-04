// @flow

export type OnFlashMessageClicked = (FlashMessage) => void;

export type FlashMessage = {
  // The id of the flashMessage must be unique for each flash message.
  id: number,

  /*
    The type of flash message, can be usefull to distinguish
    between types of messages. For example you might have a type
    'error', 'warning' or 'info'.
  */
  type: string,

  // The text message you want to show to the user.
  text: string,

  // How long a flash message should be should to the user.
  duration: number | false,

  /*
    What needs to happen when the message is clicked. Should
    receive the FlashMessage which is clicked.
  */
  onClick: OnFlashMessageClicked,

  /*
    This 'data' object can be used to store any custom data you want to
    associate with the Flash Message. The data 'key' will never
    be used / manipulated now and in the future.
  */
  data: Object
};

export type FlashMessageConfig = {
  // The text message you want to show to the user.
  text: string,

  /*
    What needs to happen when the message is clicked. Should
    receive the FlashMessage which is clicked.
  */
  onClick?: OnFlashMessageClicked,
  
  /*
    This 'data' object can be used to store any custom data you want to
    associate with the Flash Message. The data 'key' will never
    be used / manipulated now and in the future.
  */
  data?: Object
};