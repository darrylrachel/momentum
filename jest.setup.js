const { jest: jestApi } = require('@jest/globals');
jestApi.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
jestApi.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);
jestApi.useFakeTimers();
