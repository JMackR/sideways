import * as React from 'react';
import { AmityUiKitProvider, AmityUiKitSocial } from './src';
import config from './uikit.config.json';

export default function App() {
  return (
    <AmityUiKitProvider
      configs={config} //put your config json object
      apiKey="b0eaed5c3a8aa5374a33de1b075b15dbd85cdfe6bf636d7a" // Put your apiKey
      apiRegion="us" // Put your apiRegion
      userId="001" // Put your UserId
      displayName="Jim Bob" // Put your displayName
      apiEndpoint="https://api.us.amity.co" //"https://api.{apiRegion}.amity.co"
    >
      <AmityUiKitSocial />
    </AmityUiKitProvider>
  );
}
