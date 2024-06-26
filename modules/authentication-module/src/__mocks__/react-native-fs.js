const RNFS = jest.mock('react-native-fs', () => {
  return {
    readDir: jest.fn(),
    writeFile: jest.fn(),
  };
});
export default RNFS;
