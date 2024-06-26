import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'; // or use require

jest.mock('react-native-device-info', () => mockRNDeviceInfo);
