/* eslint-disable */
export default {
  displayName: 'authentication-service',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/authentication-service',
  roots: ['<rootDir>', '<rootDir>/../../tests/units/authentication-service'],
};
