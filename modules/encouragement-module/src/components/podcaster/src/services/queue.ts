import AsyncStorage from '@react-native-async-storage/async-storage';
import { NowPlayingItem } from 'podverse-shared';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import { errorLogger } from '../lib/logger';
import { PV } from '../resources';
import { AutoPlayEpisodesFromPodcast } from '../resources/Queue';
import { checkIfShouldUseServerData, getBearerToken } from './auth';
import { playerSyncPlayerWithQueue } from './player';
import { request } from './request';

const _fileName = 'src/services/queue.ts';

export const addQueueItemLast = async (item: NowPlayingItem) => {
  const useServerData = await checkIfShouldUseServerData();
  const results = useServerData ? await addQueueItemLastOnServer(item) : await addQueueItemLastLocally(item);
  return results;
};

export const addQueueItemNext = async (item: NowPlayingItem) => {
  const useServerData = await checkIfShouldUseServerData();
  const results = useServerData ? await addQueueItemNextOnServer(item) : await addQueueItemNextLocally(item);
  return results;
};

export const getQueueItems = async () => {
  const useServerData = await checkIfShouldUseServerData();
  return useServerData ? getQueueItemsFromServer() : getQueueItemsLocally();
};

export const getNextFromQueue = async () => {
  const useServerData = await checkIfShouldUseServerData();
  let item = await getNextFromQueueLocally();

  if (useServerData) {
    const data = await getNextFromQueueFromServer();
    if (data) {
      const { nextItem, userQueueItems } = data;
      item = nextItem;
      await setAllQueueItemsLocally(userQueueItems);
    }
  } else if (item) {
    removeQueueItem(item);
  }

  return item;
};

export const removeQueueItem = async (item: NowPlayingItem) => {
  let items = [];
  const useServerData = await checkIfShouldUseServerData();

  if (useServerData) {
    items = await removeQueueItemOnServer(item);
  } else {
    items = await removeQueueItemLocally(item);
  }

  return items;
};

export const setAllQueueItems = async (items: NowPlayingItem[]) => {
  await setAllQueueItemsLocally(items);
  await playerSyncPlayerWithQueue();
  return items;
};

const addQueueItemLastLocally = async (item: NowPlayingItem) => {
  const items = await getQueueItemsLocally();
  const filteredItems = filterItemFromQueueItems(items, item);
  filteredItems.push(item);
  await setAllQueueItemsLocally(filteredItems);
  await playerSyncPlayerWithQueue();
  return filteredItems;
};

const addQueueItemLastOnServer = async (item: NowPlayingItem) => {
  const maxQueuePosition = 100000;
  return addQueueItemToServer(item, maxQueuePosition);
};

const addQueueItemNextLocally = async (item: NowPlayingItem) => {
  const items = await getQueueItemsLocally();
  const filteredItems = filterItemFromQueueItems(items, item);
  filteredItems.unshift(item);
  await setAllQueueItemsLocally(filteredItems);
  await playerSyncPlayerWithQueue();
  return filteredItems;
};

const addQueueItemNextOnServer = async (item: NowPlayingItem) => {
  return addQueueItemToServer(item, 0);
};

export const addQueueItemToServer = async (item: NowPlayingItem, newPosition: number) => {
  const { clipId, episodeId } = item;

  if (!clipId && !episodeId) {
    throw new Error('A clipId or episodeId must be provided.');
  }

  const bearerToken = await getBearerToken();
  const body = {
    episodeId: (!clipId && episodeId) || null,
    mediaRefId: clipId || null,
    queuePosition: newPosition,
  };

  const response = await request({
    endpoint: '/user-queue-item',
    method: 'PATCH',
    headers: {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    },
    body,
    opts: { credentials: 'include' },
  });

  const { userQueueItems } = response?.data || {};
  if (userQueueItems) {
    await setAllQueueItemsLocally(userQueueItems);
  }

  await playerSyncPlayerWithQueue();

  return userQueueItems;
};

export const filterItemFromQueueItems = (items: NowPlayingItem[] = [], item: NowPlayingItem) => {
  let itemsArray = Array.isArray(items) ? items : [];
  if (item) {
    itemsArray = itemsArray.filter((x) => {
      if (!item) {
        return false;
      } else if (item.clipId && x.clipId === item.clipId) {
        return false;
      } else if (!item.clipId && !x.clipId && x.episodeId === item.episodeId) {
        return false;
      }
      return true;
    });
  }

  return itemsArray;
};

const getNextFromQueueLocally = async () => {
  const items = await getQueueItemsLocally();
  const item = items.shift();
  return item;
};

const getNextFromQueueFromServer = async () => {
  const bearerToken = await getBearerToken();
  const response = await request({
    endpoint: '/user-queue-item/pop-next',
    method: 'GET',
    headers: { Authorization: bearerToken },
    opts: { credentials: 'include' },
  });

  return response && response.data;
};

export const getQueueItemsLocally = async () => {
  try {
    const itemsString = await AsyncStorage.getItem(PV.Keys.QUEUE_ITEMS);
    return itemsString ? JSON.parse(itemsString) : [];
  } catch (error) {
    return [];
  }
};

const getQueueItemsFromServer = async () => {
  const bearerToken = await getBearerToken();

  /* If user membership is expired, we don't want the 401 error to crash the app,
     so return an empty response body instead. */
  let response = {
    data: {
      userQueueItems: [],
    },
  };

  try {
    response = await request({
      endpoint: '/user-queue-item',
      method: 'GET',
      headers: { Authorization: bearerToken },
      opts: { credentials: 'include' },
    });
  } catch (error) {
    errorLogger(_fileName, 'getQueueItemsFromServer', error);
  }

  const userQueueItems = response && response.data && response.data.userQueueItems;
  await setAllQueueItemsLocally(userQueueItems);
  return userQueueItems;
};

const removeQueueItemLocally = async (item: NowPlayingItem) => {
  const items = await getQueueItemsLocally();
  const filteredItems = filterItemFromQueueItems(items, item);
  return setAllQueueItemsLocally(filteredItems);
};

const removeQueueItemOnServer = async (item: NowPlayingItem) => {
  const { clipId, episodeId } = item;
  await removeQueueItemLocally(item);
  const bearerToken = await getBearerToken();

  if (clipId) {
    const response = await request({
      endpoint: `/user-queue-item/mediaRef/${clipId}`,
      method: 'DELETE',
      headers: { Authorization: bearerToken },
      opts: { credentials: 'include' },
    });
    return response && response.data && response.data.userQueueItems;
  } else if (episodeId) {
    const response = await request({
      endpoint: `/user-queue-item/episode/${episodeId}`,
      method: 'DELETE',
      headers: { Authorization: bearerToken },
      opts: { credentials: 'include' },
    });
    return response && response.data && response.data.userQueueItems;
  }

  throw new Error('Must provide a clipId or episodeId.');
};

export const setAllQueueItemsLocally = async (items: NowPlayingItem[]) => {
  if (Array.isArray(items)) {
    await AsyncStorage.setItem(PV.Keys.QUEUE_ITEMS, JSON.stringify(items));
  }
  return items;
};

export type QueueRepeatModeMusic = 'off' | 'track' | 'queue';

export const getQueueRepeatModeMusic = async () => {
  return AsyncStorage.getItem(PV.Keys.QUEUE_REPEAT_MODE_MUSIC);
};

export const setQueueRepeatModeMusic = async (repeatMode: QueueRepeatModeMusic) => {
  if (repeatMode === 'queue') {
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
    await AsyncStorage.setItem(PV.Keys.QUEUE_REPEAT_MODE_MUSIC, repeatMode);
  } else if (repeatMode === 'track') {
    TrackPlayer.setRepeatMode(RepeatMode.Track);
    await AsyncStorage.setItem(PV.Keys.QUEUE_REPEAT_MODE_MUSIC, repeatMode);
  } else {
    TrackPlayer.setRepeatMode(RepeatMode.Off);
    await AsyncStorage.removeItem(PV.Keys.QUEUE_REPEAT_MODE_MUSIC);
  }
};

export const setRNTPRepeatMode = async (isMusic: boolean) => {
  const repeatMode = await getQueueRepeatModeMusic();
  if (isMusic && repeatMode === 'queue') {
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } else if (isMusic && repeatMode === 'track') {
    TrackPlayer.setRepeatMode(RepeatMode.Track);
  } else {
    TrackPlayer.setRepeatMode(RepeatMode.Off);
  }
};

export const setQueueEnabledWhileMusicIsPlaying = async (val: boolean) => {
  if (val) {
    await AsyncStorage.setItem(PV.Keys.QUEUE_ENABLED_WHILE_MUSIC_IS_PLAYING, 'TRUE');
  } else {
    await AsyncStorage.removeItem(PV.Keys.QUEUE_ENABLED_WHILE_MUSIC_IS_PLAYING);
  }
};

export const getAutoPlayEpisodesFromPodcast = async () => {
  const val = await AsyncStorage.getItem(PV.Keys.QUEUE_AUTO_PLAY_EPISODES_FROM_PODCAST);
  return val || 'off';
};

export const setAutoPlayEpisodesFromPodcast = async (val: AutoPlayEpisodesFromPodcast) => {
  if (val === 'older' || val === 'newer') {
    await AsyncStorage.setItem(PV.Keys.QUEUE_AUTO_PLAY_EPISODES_FROM_PODCAST, val);
  } else {
    await AsyncStorage.setItem(PV.Keys.QUEUE_AUTO_PLAY_EPISODES_FROM_PODCAST, 'off');
  }
};
