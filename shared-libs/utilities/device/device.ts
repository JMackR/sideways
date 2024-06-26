// @ts-ignore
import cookie from 'cookie';
import _ from 'lodash';

/*
 * Get device info based on request
 */
export interface DeviceInfoProps {
  isMobile: boolean;
  isTablet: boolean;
  deviceId: string;
}

export const getDeviceInfo = (req: any) => {
  const userAgent = _.property('headers')(req) ? _.toString(req.headers['user-agent']).toLowerCase() : '';
  const getOS = () => {
    let os = 'unknown';
    if (/android/i.test(userAgent)) {
      os = 'android';
    }
    if (/ipad|iphone|ipod/.test(userAgent)) {
      os = 'ios';
    }
    return os;
  };
  const deviceOS = getOS();
  const isMobile = () => {
    return ['android', 'ios'].indexOf(deviceOS) > -1;
  };
  const isTablet = () => {
    if (userAgent.indexOf('ipad') > -1) {
      return true;
    }
    /**
     * Ref for user agent on android tablet
     * https://developer.chrome.com/multidevice/user-agent
     * https://deviceatlas.com/blog/list-of-user-agent-strings
     */
    if (userAgent.indexOf('android') > -1 && userAgent.indexOf('mobile') <= -1) {
      return true;
    }
    return false;
  };
  const getDeviceId = () => {
    const cookies = _.property('headers.cookie')(req);
    if (cookies) {
      const { DX } = cookie.parse(_.toString(cookies));
      return DX;
    }
    return undefined;
  };

  return {
    isMobile: isMobile(),
    isTablet: isTablet(),
    deviceId: getDeviceId(),
  };
};
