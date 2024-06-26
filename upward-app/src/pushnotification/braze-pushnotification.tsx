import { useEffect } from 'react';
import type { ReactElement } from 'react';
import Braze from '@braze/react-native-sdk';

const automaticallyInteract = false;

export const BrazeProject = (): ReactElement => {
  useEffect(() => {
    Braze.subscribeToInAppMessage(true, (event) => {
      if (automaticallyInteract) {
        console.log('Automatically logging IAM click, button click `0`, and impression.');
        Braze.logInAppMessageClicked(event.inAppMessage);
        Braze.logInAppMessageImpression(event.inAppMessage);
        Braze.logInAppMessageButtonClicked(event.inAppMessage, 0);
      }
    });

    const inAppMessageSubscription = Braze.addListener(Braze.Events.IN_APP_MESSAGE_RECEIVED, (inAppMessage) => {
      console.log('In-App Message Received: ', inAppMessage);
    });

    const sdkAuthErrorSubscription = Braze.addListener(Braze.Events.SDK_AUTHENTICATION_ERROR, (data) => {
      console.log(`SDK Authentication for ${data.user_id} failed with error code ${data.error_code}.`);
    });

    const pushEventSubscription = Braze.addListener(Braze.Events.PUSH_NOTIFICATION_EVENT, function (data) {
      console.log(`Push Notification event of type ${data.payload_type} seen.
        Title ${data.title}\n and deeplink ${data.url}`);
      console.log(JSON.stringify(data, undefined, 2));
    });

    return () => {
      inAppMessageSubscription.remove();
      sdkAuthErrorSubscription.remove();
      pushEventSubscription.remove();
    };
  }, []);

  return null;
};
