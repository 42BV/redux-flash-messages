# About

[![Build Status](https://travis-ci.org/42BV/redux-flash-messages.svg?branch=master)](https://travis-ci.org/42BV/redux-flash-messages)
[![Codecov](https://codecov.io/gh/42BV/redux-flash-messages/branch/master/graph/badge.svg)](https://codecov.io/gh/42BV/redux-flash-messages)

This library makes it easy to create flash messages and to store them in a Redux store. 

What makes this project a little different from most flash message libraries is that it is UI agnostic. This library does not render the FlashMessages for you it only stores them!

# Installation

`npm install redux-flash-messages --save`

# Getting started.

We assume you have a working Redux project, if you do not yet have Redux add Redux to your project by following the Redux's instructions.

First install the following dependencies in the package.json:

  1. "react-redux": "5.0.3",
  2. "redux": "3.6.0",

Now add the flash-message-reducer to your rootReducer for example:

```JavaScript
// @flow

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import type { FlashMessageStore } from '../jarb-redux-form';
import { flashMessage } from '../jarb-redux-form';

export type Store = {
  flashMessage: FlashMessageStore
};

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  flashMessage
});

export default rootReducer;
```

This should add the FlashMessageStore to Redux, which will store
the flash messages.

Next you have to configure the flashMessages module:

```JavaScript
import { createStore } from 'redux';
import { configureFlashMessages } from 'redux-flash-messages';

export const store = createStore(
  rootReducer,
);

configureFlashMessages({
  // The dispatch function for the Redux store.
  dispatch: store.dispatch
});
```

The redux-flash-messages module must be configured before the application is rendered.

# Rendering flash messages

Next we need to render the flash messages from the Redux store. How you do this is entirely up to you, but here is a small example:

```JavaScript
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { Store } from '../../../redux/root-reducer';
import type { Dispatch } from '../../../redux/models';

import type { FlashMessage as FlashMessageShape } from 'redux-flash-messages';
import { removeFlashMessage } from 'redux-flash-messages';

import './FlashMessage.css';

type Props = {
  messages: Array<FlashMessageShape>,
  dispatch: Dispatch
};

export class FlashMessage extends Component<void, Props, void> {

  onFlashMessageClick(flashMessage: FlashMessageShape) {
    /* 
      Make sure the onClick is called when a user clicks 
      on the flash message.
      
      Otherwise callbacks on Flash Messages will not work.
    */
    flashMessage.onClick(flashMessage);

    // This implementation deletes the flash message when it is clicked.
    this.props.dispatch(removeFlashMessage(flashMessage.id));
  }

  render() {
    const messages = this.props.messages;

    return (
      <div>
        { messages.map((message) => this.renderMessage(message))}
      </div>
    );
  }

  /* 
    This renders a rather simple flash message. 
    
    But you could and should use the 'type' property to
    render the flash message in a different style for each 'type'.
  */
  renderMessage(message: FlashMessageShape) {
    return (
      <div
        key={ message.id }
        className={ `flash-message ${message.type}`}
        onClick={ () => this.onFlashMessageClick(message) }
      >
        { message.text }
      </div>
    );
  }
}

export default connect((store: Store) => {
  return {
    messages: store.flashMessage.messages
  };
})(FlashMessage);
```

Where the contents of 'FlashMessage.css' is:

```CSS
.flash-message {
  position: absolute;
  width: 100%;
  height: 50px;
  text-align: center;
  z-index: 9000;
  background-color: white;
  border: black solid 2px;
  padding: 12.5px 0;
}
```

# Sending flash messages

Now that we can see the flash messages we can use the following convenience  methods to send flash messages:

```JavaScript
import { addError, addWarning, addSuccess, addInfo, addApocalypse } from '../src/service';

// Renders a message for 10000 milliseconds
addError({ text: 'Epic error', data: { age: 12 }, onClick: (flashMessage) => {
  console.log('I was clicked');
  console.log(flashMessage);
}});

// Renders a message for 7000 milliseconds
addWarning({ text: 'Epic warning', data: { tree: 'house' }, onClick: (flashMessage) => {
  console.log('I was clicked');
  console.log(flashMessage);
}});

// Renders a message for 2000 milliseconds
addSuccess({ text: 'Epic success', data: { win: true }, onClick: (flashMessage) => {
  console.log('I was clicked');
  console.log(flashMessage);
}});

// Renders a message for 5000 milliseconds
addInfo({ text: 'Epic info', data: { yo: 'man' }, onClick: (flashMessage) => {
  console.log('I was clicked');
  console.log(flashMessage);
}});

// Renders a message which is not automatically removed
addApocalypse({ text: 'TOTAL ANNIHILATION', data: { fail: true }, onClick: (flashMessage) => {
  console.log('I was clicked');
  console.log(flashMessage);
}});
```

The `onClick` and the `data` keys are optional. The `data`
key can be used to send whatever `data` you want to the
component which renders the flash message.

# Creating a custom flash message type.

If the default types are not enough you can always create your own flash message creator:

You do this by calling `addFlashMessageOfType` manually.

```JavaScript
import { addFlashMessageOfType } from '../src/service';

export function addNotice({ text, onClick, data }: FlashMessageConfig) {
  addFlashMessageOfType('NOTICE', 1000, text, onClick, data);
}
```
