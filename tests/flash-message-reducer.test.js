
import { createStore } from 'redux';

import { flashMessage, initialState, addFlashMessage, removeFlashMessage } from '../src/flash-message-reducer';

describe('Store: FlashMessageStore', () => {
  test('initial state', () => {
    const flashMessageStore = flashMessage(undefined, { type: 'FAKE_ACTION' });

    const expected = {
      messages: []
    };

    expect(flashMessageStore).toEqual(expected);
  });

  test('lifecycle', () => {
    // First we create a store.
    const store = createStore(flashMessage, initialState);

    const onClickSpy = jest.fn();

    // Second we configure a Flash Message
    const flashMessageOne = {
      id: 1,
      type: 'info',
      text: `Added the stuff successfully`,
      duration: 1000,
      onClick: onClickSpy,
      data: { age: 12 }
    };

    // Now we add the message to the store.
    store.dispatch(addFlashMessage(flashMessageOne));

    let state = store.getState();

    // We expect our message to be in the store with the id 1.
    expect(state.messages).toEqual([{
      id: 1,
      type: 'info',
      text: `Added the stuff successfully`,
      duration: 1000,
      onClick: onClickSpy,
      data: { age: 12 }
    }]);

    // Now we add the same flash message again.
    const flashMessageTwo = {
      id: 2,
      type: 'error',
      text: `Epic failure`,
      duration: 3000,
      onClick: onClickSpy,
      data: { age: 15 }
    };

    store.dispatch(addFlashMessage(flashMessageTwo));

    state = store.getState();

    // The message should be added with the id of 2.
    expect(state.messages).toEqual([{
      id: 1,
      type: 'info',
      text: `Added the stuff successfully`,
      duration: 1000,
      onClick: onClickSpy,
      data: { age: 12 }
    }, {
      id: 2,
      type: 'error',
      text: `Epic failure`,
      duration: 3000,
      onClick: onClickSpy,
      data: { age: 15 }
    }]);

    // Now lets remove the first message
    store.dispatch(removeFlashMessage(1));

    state = store.getState();

    // The first message should be removed
    expect(state.messages).toEqual([{
      id: 2,
      type: 'error',
      text: `Epic failure`,
      duration: 3000,
      onClick: onClickSpy,
      data: { age: 15 }
    }]);
  });
});
