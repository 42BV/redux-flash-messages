
import { 
  addError, 
  addWarning, 
  addSuccess, 
  addInfo, 
  addApocalypse, 
  resetNextFlashMessageId,
  addFlashMessageOfType
} from '../src/service';

import { configureFlashMessages } from '../src/config';

import * as actions from '../src/flash-message-reducer';

jest.useFakeTimers();

describe('Flash message creators', () => {
  let onClickSpy;
  let dispatch;

  beforeEach(() => {
    onClickSpy = jest.fn();
    dispatch = jest.fn();

    resetNextFlashMessageId();

    actions.addFlashMessage = jest.fn(() => 'addFlashMessage');
    actions.removeFlashMessage = jest.fn(() => 'removeFlashMessage');

    configureFlashMessages({ dispatch });
  });

  test('addError', () => {
    addError({ text: 'Epic error', onClick: onClickSpy, data: { age: 12 } });

    expect(actions.addFlashMessage).toHaveBeenCalledTimes(1);
    expect(actions.addFlashMessage).toHaveBeenCalledWith({
      id: 1,
      type: 'ERROR',
      text: 'Epic error',
      onClick: onClickSpy,
      duration: 10000,
      data: { age: 12 }
    })

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('addFlashMessage');

    jest.runTimersToTime(10000);

    expect(actions.removeFlashMessage).toHaveBeenCalledTimes(1);
    expect(actions.removeFlashMessage).toHaveBeenCalledWith(1);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith('removeFlashMessage');
  });

  test('addWarning', () => {
    addWarning({ text: 'Epic warning', onClick: onClickSpy, data: { age: 13 } });

    expect(actions.addFlashMessage).toHaveBeenCalledTimes(1);
    expect(actions.addFlashMessage).toHaveBeenCalledWith({
      id: 1,
      type: 'WARNING',
      text: 'Epic warning',
      onClick: onClickSpy,
      duration: 7000,
      data: { age: 13 }
    })

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('addFlashMessage');

    jest.runTimersToTime(7000);

    expect(actions.removeFlashMessage).toHaveBeenCalledTimes(1);
    expect(actions.removeFlashMessage).toHaveBeenCalledWith(1);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith('removeFlashMessage');
  });

  test('addSuccess', () => {
    addSuccess({ text: 'Epic success', onClick: onClickSpy, data: { age: 14 } });

    expect(actions.addFlashMessage).toHaveBeenCalledTimes(1);
    expect(actions.addFlashMessage).toHaveBeenCalledWith({
      id: 1,
      type: 'SUCCESS',
      text: 'Epic success',
      onClick: onClickSpy,
      duration: 2000,
      data: { age: 14 }
    })

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('addFlashMessage');

    jest.runTimersToTime(2000);

    expect(actions.removeFlashMessage).toHaveBeenCalledTimes(1);
    expect(actions.removeFlashMessage).toHaveBeenCalledWith(1);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith('removeFlashMessage');
  });

  test('addInfo', () => {
    addInfo({ text: 'Epic info', onClick: onClickSpy, data: { age: 15 } });

    expect(actions.addFlashMessage).toHaveBeenCalledTimes(1);
    expect(actions.addFlashMessage).toHaveBeenCalledWith({
      id: 1,
      type: 'INFO',
      text: 'Epic info',
      onClick: onClickSpy,
      duration: 5000,
      data: { age: 15 }
    })

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('addFlashMessage');

    jest.runTimersToTime(5000);

    expect(actions.removeFlashMessage).toHaveBeenCalledTimes(1);
    expect(actions.removeFlashMessage).toHaveBeenCalledWith(1);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith('removeFlashMessage');
  });

  test('addApocalypse', () => {
    addApocalypse({ text: 'TOTAL ANNIHILATION', onClick: onClickSpy, data: { age: 16 } });

    expect(actions.addFlashMessage).toHaveBeenCalledTimes(1);
    expect(actions.addFlashMessage).toHaveBeenCalledWith({
      id: 1,
      type: 'APOCALYPSE',
      text: 'TOTAL ANNIHILATION',
      onClick: onClickSpy,
      duration: false,
      data: { age: 16 }
    })

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('addFlashMessage');
  });

  test('addFlashMessageOfType', () => {
    addFlashMessageOfType('BLAAT', false, 'sup yall');

    expect(actions.addFlashMessage).toHaveBeenCalledTimes(1);

    const args = actions.addFlashMessage.mock.calls[0][0];

    args.onClick();
    expect(args.data).toEqual({});
  });
});
