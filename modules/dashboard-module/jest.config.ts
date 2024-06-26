module.exports = {
  displayName: '@upward/authentication',
  preset: 'react-native',
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|react-native-image-crop-picker|@braze/react-native-sdk|@react-navigation|react-redux|@reduxjs/toolkit|@react-native-firebase/(.*))/)',
  ],
  coverageDirectory: '../coverage/upward-modules/authentication',
};
