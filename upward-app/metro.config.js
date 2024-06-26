const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts;
const defaultAssetExts = require('metro-config/src/defaults/defaults').assetExts;
const { getMetroTools, getMetroAndroidAssetsResolutionFix } = require('react-native-monorepo-tools');
const monorepoMetroTools = getMetroTools();
const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  transformer: {
    publicPath: androidAssetsResolutionFix.publicPath,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  server: {
    // ...and to the server middleware.
    enhanceMiddleware: (middleware) => {
      return androidAssetsResolutionFix.applyMiddleware(middleware);
    },
  },
  watchFolders: monorepoMetroTools.watchFolders,
  resolver: {
    assetExts: defaultAssetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultSourceExts, 'json', 'svg'],
    extraNodeModules: monorepoMetroTools.extraNodeModules,
  },
});
