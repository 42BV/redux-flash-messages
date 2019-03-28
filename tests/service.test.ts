import {
  addError,
  addWarning,
  addSuccess,
  addInfo,
  addApocalypse,
  resetNextFlashMessageId,
  addFlashMessageOfType,
} from '../src/service';

import { configureFlashMessages } from '../src/config';
import { MessageTypes } from '../src/models';

// Mock implementations for addFlashMessage and removeFlashMessage.
jest.mock('../src/flash-message-reducer', () => ({
  ...jest.requireActual('../src/flash-message-reducer'),
  addFlashMessage: jest.fn(() => 'addFlashMessage'),
  removeFlashMessage: jest.fn(() => 'removeFlashMessage'),
}));

import {
  addFlashMessage as mockAddFlashMessage,
  removeFlashMessage as mockRemoveFlashMessage,
} from '../src/flash-message-reducer';

jest.useFakeTimers();

describe('Flash message creators', () => {
  let onClickSpy: jest.Mock;
  let dispatch: jest.Mock;

  beforeEach(() => {
    onClickSpy = jest.fn();
    dispatch = jest.fn();

    jest.clearAllMocks();

    resetNextFlashMessageId();
    configureFlashMessages({ dispatch });
  });

  test('addError', () => {
    addError({ text: 'Epic error', onClick: onClickSpy, data: { age: 12 } });

    expect(mockAddFlashMessage).toHaveBeenCalledTimes(1);
    expect(mockAddFlashMessage).toHaveBeenCalledWith({
      id: 1,
      type: MessageTypes.Error,
      text: 'Epic error',
      onClick: onClickSpy,
      duration: 10000,
      data: { age: 12 },
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('addFlashMessage');

    jest.runTimersToTime(10000);

    expect(mockRemoveFlashMessage).toHaveBeenCalledTimes(1);
    expect(mockRemoveFlashMessage).toHaveBeenCalledWith(1);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith('removeFlashMessage');
  });

  test('addWarning', () => {
    addWarning({ text: 'Epic warning', onClick: onClickSpy, data: { age: 13 } });

    expect(mockAddFlashMessage).toHaveBeenCalledTimes(1);
    expect(mockAddFlashMessage).toHaveBeenCalledWith({
      id: 1,
      type: MessageTypes.Warning,
      text: 'Epic warning',
      onClick: onClickSpy,
      duration: 7000,
      data: { age: 13 },
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('addFlashMessage');

    jest.runTimersToTime(7000);

    expect(mockRemoveFlashMessage).toHaveBeenCalledTimes(1);
    expect(mockRemoveFlashMessage).toHaveBeenCalledWith(1);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith('removeFlashMessage');
  });

  test('addSuccess', () => {
    addSuccess({ text: 'Epic success', onClick: onClickSpy, data: { age: 14 } });

    expect(mockAddFlashMessage).toHaveBeenCalledTimes(1);
    expect(mockAddFlashMessage).toHaveBeenCalledWith({
      id: 1,
      type: MessageTypes.Success,
      text: 'Epic success',
      onClick: onClickSpy,
      duration: 2000,
      data: { age: 14 },
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('addFlashMessage');

    jest.runTimersToTime(2000);

    expect(mockRemoveFlashMessage).toHaveBeenCalledTimes(1);
    expect(mockRemoveFlashMessage).toHaveBeenCalledWith(1);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith('removeFlashMessage');
  });

  test('addInfo', () => {
    addInfo({ text: 'Epic info', onClick: onClickSpy, data: { age: 15 } });

    expect(mockAddFlashMessage).toHaveBeenCalledTimes(1);
    expect(mockAddFlashMessage).toHaveBeenCalledWith({
      id: 1,
      type: MessageTypes.Info,
      text: 'Epic info',
      onClick: onClickSpy,
      duration: 5000,
      data: { age: 15 },
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('addFlashMessage');

    jest.runTimersToTime(5000);

    expect(mockRemoveFlashMessage).toHaveBeenCalledTimes(1);
    expect(mockRemoveFlashMessage).toHaveBeenCalledWith(1);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith('removeFlashMessage');
  });

  test('addApocalypse', () => {
    addApocalypse({ text: 'TOTAL ANNIHILATION', onClick: onClickSpy, data: { age: 16 } });

    expect(mockAddFlashMessage).toHaveBeenCalledTimes(1);
    expect(mockAddFlashMessage).toHaveBeenCalledWith({
      id: 1,
      type: MessageTypes.Apocalypse,
      text: 'TOTAL ANNIHILATION',
      onClick: onClickSpy,
      duration: false,
      data: { age: 16 },
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('addFlashMessage');
  });

  test('addFlashMessageOfType', () => {
    const enum CustomTypes {
      Blaat = 'BLAAT',
    }

    addFlashMessageOfType(CustomTypes.Blaat, false, 'sup yall');
    expect(mockAddFlashMessage).toHaveBeenCalledTimes(1);

    const args = (mockAddFlashMessage as jest.Mock).mock.calls[0][0];
    args.onClick();
    expect(args.data).toEqual({});
  });
});
