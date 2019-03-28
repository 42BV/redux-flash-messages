import { configureFlashMessages, getConfig } from '../src/config';

test('configuration lifecycle', () => {
  // When not initialized it should throw an error.
  expect(() => getConfig()).toThrow('The flash message service is not initialized.');

  // Next we initialize the config.
  const config = {
    dispath: jest.fn,
  };

  // @ts-ignore
  configureFlashMessages(config);

  // Now we expect the config to be set.
  expect(getConfig()).toBe(config);
});
