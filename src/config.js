// @flow

export type Config = {
  // The dispatch function for the Redux store.
  dispatch: () => void,
};

let config: Config | null = null;

/**
 * Configures the FlashMessages libary.
 *
 * @param {Config} The new configuration
 */
export function configureFlashMessages(c: Config) {
  config = c;
}

/**
 * Either returns the a Config or throws an error when the
 * config is not yet initialized.
 *
 * @returns The Config
 */
export function getConfig(): Config {
  if (config === null) {
    throw new Error('The flash message service is not initialized.');
  } else {
    return config;
  }
}
