import _ from 'lodash';
import { useColor } from '@upward/themes';

export function hashStringToNumber(str: string) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) + hash + char; /* hash * 33 + c */ // eslint-disable-line
  }
  return hash;
}
export function extractAccessibilityProps(props: any = this.props) {
  return _.pickBy(props, (_value, key) => {
    return /.*ccessib.*/.test(key);
  });
}
export function getAvatarColors() {
  const { colors } = useColor();
  return [colors.brand, colors.crystal, colors.blue, colors.grey, colors.paintbrushRed, colors.red];
}

export function getColorById(id: string, avatarColors = getAvatarColors()) {
  if (!id) {
    return avatarColors[0];
  }

  const hashedId = hashStringToNumber(id);
  const colorIndex = Math.abs(hashedId % avatarColors.length);
  return avatarColors[colorIndex];
}

export function getInitials(name?: string, limit = 2) {
  let initials = '';
  if (name && _.isString(name)) {
    const nameSplitted = _.chain(name)
      .split(/\s+/g)
      .filter((word) => word.length > 0)
      .take(limit)
      .value();
    _.each(nameSplitted, (str) => {
      initials += str[0];
    });
  }

  return _.toUpper(initials);
}

export function getBackgroundColor(
  name?: string,
  avatarColors?: string[],
  hashFunction?: (name?: string) => number,
  defaultColor?: string,
) {
  if (!name || !avatarColors || !hashFunction) {
    return defaultColor;
  }

  const hash = hashFunction(name);
  const index = Math.abs(hash % avatarColors.length);
  return avatarColors[index];
}

export function isGravatarUrl(url: string) {
  const { hostname, pathname } = new URL(url);
  return _.split(hostname, '.').includes('gravatar') && pathname.startsWith('/avatar/');
}

export function isBlankGravatarUrl(url: string) {
  return isGravatarUrl(url) && _.endsWith(url, '?d=blank');
}

export function patchGravatarUrl(gravatarUrl: string) {
  const url = new URL(gravatarUrl, true);
  const { query } = url;
  query.d = '404';
  delete query.default;
  url.set('query', query);
  return url.toString();
}
