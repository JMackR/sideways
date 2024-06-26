import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import Share from 'react-native-share';
import { getGlobal } from 'reactn';
import { errorLogger } from '../lib/logger';
import { translate } from '../lib/i18n';
import {
  navigateToAlbumScreenWithNowPlayingItem,
  navigateToEpisodeScreenWithItem,
  navigateToEpisodeScreenWithItemInCurrentStack,
  navigateToPodcastScreenWithItem,
} from '../lib/navigate';
import { prefixClipLabel, safelyUnwrapNestedVariable } from '../lib/utility';
import { IActionSheet } from '../resources/Interfaces';
import { playerGetPosition } from '../services/player';
import { removeDownloadedPodcastEpisode } from '../state/actions/downloads';
import { playerLoadNowPlayingItem } from '../state/actions/player';
import { addQueueItemLast, addQueueItemNext } from '../state/actions/queue';
import { toggleMarkAsPlayed } from '../state/actions/userHistoryItem';
import { PV } from './PV';
import { convertNowPlayingItemToEpisode, convertNowPlayingItemToMediaRef } from 'podverse-shared';

const _fileName = 'src/resources/ActionSheet.ts';

const mediaMoreButtons = (
  item: any = {},
  navigation: any,
  config: {
    handleDismiss: any;
    handleDownload: any;
    handleDeleteClip: any;
    includeGoToPodcast?: boolean;
    includeGoToEpisodeInEpisodesStack?: boolean | string;
    includeGoToEpisodeInCurrentStack?: boolean;
  },
  itemType: 'album' | 'podcast' | 'episode' | 'clip' | 'chapter' | 'playlist' | 'profile' | 'track',
) => {
  if (!item || !item.episodeId) return;

  const {
    handleDismiss,
    handleDownload,
    handleDeleteClip,
    includeGoToPodcast,
    includeGoToEpisodeInEpisodesStack,
    includeGoToEpisodeInCurrentStack,
  } = config || {};
  const globalState = getGlobal();
  const isDownloading = globalState.downloadsActive && globalState.downloadsActive[item.episodeId];
  const downloadingText = isDownloading ? translate('Downloading Episode') : translate('Download');
  const downloadingAccessibilityHint = isDownloading ? '' : translate('ARIA HINT - download this episode');
  const isDownloaded = globalState.downloadedEpisodeIds[item.episodeId];
  const buttons = [];
  const loggedInUserId = safelyUnwrapNestedVariable(() => globalState.session?.userInfo?.id, '');
  const isLoggedIn = safelyUnwrapNestedVariable(() => globalState.session?.isLoggedIn, '');
  const globalTheme = safelyUnwrapNestedVariable(() => globalState.globalTheme, {});
  const historyItemsIndex = safelyUnwrapNestedVariable(() => globalState.session?.userInfo?.historyItemsIndex, {});

  if (item.ownerId && item.ownerId === loggedInUserId) {
    buttons.push(
      {
        accessibilityLabel: translate('Edit Clip'),
        key: PV.Keys.edit_clip,
        text: translate('Edit Clip'),
        onPress: async () => {
          const { darkTheme } = require('../styles');
          const isDarkMode = globalState.globalTheme === darkTheme;
          await handleDismiss();
          await playerLoadNowPlayingItem(item, {
            forceUpdateOrderDate: false,
            setCurrentItemNextInQueue: true,
            shouldPlay: false,
          });
          await navigation.navigate(PV.RouteNames.PlayerScreen, { isDarkMode });
          setTimeout(() => {
            (async () => {
              const initialProgressValue = await playerGetPosition();
              navigation.navigate(PV.RouteNames.MakeClipScreen, {
                initialProgressValue,
                initialPrivacy: item.isPublic,
                isEditing: true,
                isLoggedIn,
                globalTheme,
              });
            })();
          }, 1000);
        },
      },
      {
        accessibilityLabel: translate('Delete Clip'),
        key: PV.Keys.delete_clip,
        text: translate('Delete Clip'),
        onPress: async () => {
          await handleDismiss();
          await handleDeleteClip(item.clipId);
        },
      },
    );
  }

  if (isDownloaded) {
    buttons.push({
      accessibilityLabel: translate('Play'),
      key: PV.Keys.play,
      text: translate('Play'),
      onPress: async () => {
        await handleDismiss();
        await playerLoadNowPlayingItem(item, {
          forceUpdateOrderDate: false,
          setCurrentItemNextInQueue: true,
          shouldPlay: true,
        });
      },
    });
  } else {
    buttons.push({
      accessibilityHint:
        itemType === 'episode'
          ? translate('ARIA HINT - stream this episode')
          : itemType === 'chapter'
          ? translate('ARIA HINT - stream this chapter')
          : itemType === 'track'
          ? translate('ARIA HINT - stream this track')
          : translate('ARIA HINT - stream this clip'),
      accessibilityLabel: translate('Stream'),
      key: PV.Keys.stream,
      text: translate('Stream'),
      onPress: async () => {
        const showAlert = await hasTriedStreamingWithoutWifiAlert(handleDismiss, navigation, false);
        if (showAlert) return;

        await handleDismiss();
        await playerLoadNowPlayingItem(item, {
          forceUpdateOrderDate: false,
          setCurrentItemNextInQueue: true,
          shouldPlay: true,
        });
      },
    });

    if (!item.liveItem && handleDownload) {
      buttons.push({
        accessibilityHint: downloadingAccessibilityHint,
        accessibilityLabel: downloadingText,
        key: PV.Keys.download,
        text: downloadingText,
        isDownloading,
        onPress: async () => {
          const showAlert = await hasTriedDownloadingWithoutWifiAlert(handleDismiss, navigation, true);
          if (showAlert) return;

          if (isDownloading) {
            await handleDismiss();
            navigation.navigate(PV.RouteNames.DownloadsScreen);
          } else {
            await handleDismiss();
            handleDownload(item);
          }
        },
      });
    }
  }

  if (!item.liveItem && !item.addByRSSPodcastFeedUrl) {
    buttons.push(
      {
        accessibilityHint:
          itemType === 'episode'
            ? translate('ARIA HINT - add this episode next in your queue')
            : itemType === 'clip'
            ? translate('ARIA HINT - add this clip next in your queue')
            : itemType === 'track'
            ? translate('ARIA HINT - add this track next in your queue')
            : translate('ARIA HINT - add this chapter next in your queue'),
        accessibilityLabel: translate('ARIA LABEL - Queue Next'),
        key: PV.Keys.queue_next,
        text: translate('Queue Next'),
        onPress: async () => {
          await addQueueItemNext(item);
          await handleDismiss();
        },
      },
      {
        accessibilityHint:
          itemType === 'episode'
            ? translate('ARIA HINT - add this episode last in your queue')
            : itemType === 'clip'
            ? translate('ARIA HINT - add this clip last in your queue')
            : itemType === 'track'
            ? translate('ARIA HINT - add this track last in your queue')
            : translate('ARIA HINT - add this chapter last in your queue'),
        accessibilityLabel: translate('ARIA LABEL - Queue Last'),
        key: PV.Keys.queue_last,
        text: translate('Queue Last'),
        onPress: async () => {
          await addQueueItemLast(item);
          await handleDismiss();
        },
      },
    );

    if (!Config.DISABLE_ADD_TO_PLAYLIST && isLoggedIn) {
      buttons.push({
        accessibilityHint:
          itemType === 'episode'
            ? translate('ARIA HINT - add this episode to a playlist')
            : itemType === 'clip'
            ? translate('ARIA HINT - add this clip to a playlist')
            : itemType === 'track'
            ? translate('ARIA HINT - add this track to a playlist')
            : translate('ARIA HINT - add this chapter to a playlist'),
        accessibilityLabel: translate('Add to Playlist'),
        key: PV.Keys.add_to_playlist,
        text: translate('Add to Playlist'),
        onPress: async () => {
          await handleDismiss();
          navigation.navigate(PV.RouteNames.PlaylistsAddToScreenModal, {
            ...(item.clipId
              ? { mediaRef: convertNowPlayingItemToMediaRef(item) }
              : { episode: convertNowPlayingItemToEpisode(item) }),
            isModal: true,
          });
        },
      });
    }
  }

  if (!Config.DISABLE_SHARE) {
    const accessibilityHint =
      itemType === 'podcast'
        ? translate('ARIA HINT - share this podcast')
        : itemType === 'episode'
        ? translate('ARIA HINT - share this episode')
        : itemType === 'clip'
        ? translate('ARIA HINT - share this clip')
        : itemType === 'chapter'
        ? translate('ARIA HINT - share this chapter')
        : itemType === 'playlist'
        ? translate('ARIA HINT - share this playlist')
        : itemType === 'profile'
        ? translate('ARIA HINT - share this profile')
        : itemType === 'track'
        ? translate('ARIA HINT - share this track')
        : translate('ARIA HINT - share this item');
    buttons.push({
      accessibilityHint,
      accessibilityLabel: translate('Share'),
      key: PV.Keys.share,
      text: translate('Share'),
      onPress: async () => {
        try {
          const urlsWeb = safelyUnwrapNestedVariable(() => globalState.urlsWeb, {});
          let url = '';
          let title = '';
          const isMusic = item?.podcastMedium === 'music';

          if (item.clipId) {
            url = urlsWeb.clip + item.clipId;
            title = item.clipTitle ? item.clipTitle : prefixClipLabel(item.episodeTitle);
            title += ` – ${item?.podcastTitle} – ${item.episodeTitle} – ${translate('clip shared using brandName')}`;
          } else if (isMusic && item.episodeId) {
            url = urlsWeb.track + item.episodeId;
            title += `${item?.podcastTitle} – ${item.episodeTitle} – ${translate('shared using brandName')}`;
          } else if (item.episodeId) {
            url = urlsWeb.episode + item.episodeId;
            title += `${item?.podcastTitle} – ${item.episodeTitle} – ${translate('shared using brandName')}`;
          }
          await Share.open({
            title,
            subject: title,
            url,
          });
        } catch (error) {
          errorLogger(_fileName, 'if (!Config.DISABLE_SHARE)', error);
        }
        await handleDismiss();
      },
    });
  }

  if (isDownloaded) {
    const text = itemType === 'track' ? translate('Music - Delete Track') : translate('Delete Episode');
    const accessibilityHint =
      itemType === 'track'
        ? translate('ARIA HINT - delete this downloaded track')
        : translate('ARIA HINT - delete this downloaded episode');
    buttons.push({
      accessibilityHint,
      accessibilityLabel: text,
      key: PV.Keys.delete_episode,
      text,
      onPress: async () => {
        removeDownloadedPodcastEpisode(item.episodeId);
        await handleDismiss();
      },
    });
  }

  if (!item.liveItem && itemType === 'episode' && !item.addByRSSPodcastFeedUrl) {
    const completed = historyItemsIndex?.episodes?.[item.episodeId]?.completed;
    const label = completed ? translate('Mark as Unplayed') : translate('Mark as Played');
    buttons.push({
      accessibilityLabel: label,
      key: PV.Keys.mark_as_played,
      text: label,
      onPress: async () => {
        await handleDismiss();
        if (isLoggedIn) {
          const shouldMarkAsPlayed = !completed;
          await toggleMarkAsPlayed(item, shouldMarkAsPlayed);
        } else {
          Alert.alert(
            PV.Alerts.LOGIN_TO_MARK_EPISODES_AS_PLAYED.title,
            PV.Alerts.LOGIN_TO_MARK_EPISODES_AS_PLAYED.message,
            PV.Alerts.GO_TO_LOGIN_BUTTONS(navigation),
          );
        }
      },
    });
  }

  // Limit the action sheet to 8 items, so all items appear even on smaller screens.
  // Since this action sheet can't be scrollable, we're just hiding the less important buttons.
  if (includeGoToPodcast && buttons.length < 8) {
    const text = itemType === 'album' ? translate('Go to Album') : translate('Go to Podcast');
    buttons.push({
      accessibilityLabel: text,
      key: PV.Keys.go_to_podcast,
      text,
      onPress: async () => {
        await handleDismiss();
        if (itemType === 'album') {
          navigateToAlbumScreenWithNowPlayingItem(navigation, item);
        } else {
          navigateToPodcastScreenWithItem(navigation, item);
        }
      },
    });
  }

  if (
    ((itemType !== 'album' && includeGoToEpisodeInEpisodesStack) || includeGoToEpisodeInCurrentStack) &&
    buttons.length < 8
  ) {
    const text = translate('Go to Episode');
    buttons.push({
      accessibilityLabel: text,
      key: PV.Keys.go_to_episode,
      text,
      onPress: async () => {
        await handleDismiss();
        if (includeGoToEpisodeInEpisodesStack) {
          navigateToEpisodeScreenWithItem(navigation, item);
        } else if (includeGoToEpisodeInCurrentStack) {
          navigateToEpisodeScreenWithItemInCurrentStack(navigation, item, includeGoToPodcast);
        }
      },
    });
  }

  return buttons;
};

const hasTriedStreamingWithoutWifiAlert = async (handleDismiss: any, navigation: any, download: boolean) => {
  const shouldDownloadWifiOnly = await AsyncStorage.getItem(PV.Keys.DOWNLOADING_WIFI_ONLY);
  if (shouldDownloadWifiOnly !== 'TRUE') {
    return false;
  }

  const [netInfoState, hasTried] = await Promise.all([
    NetInfo.fetch(),
    AsyncStorage.getItem(PV.Keys.HAS_TRIED_STREAMING_WITHOUT_WIFI),
  ]);

  const showAlert = netInfoState.type !== 'wifi' && !hasTried;
  if (showAlert) {
    await AsyncStorage.setItem(PV.Keys.HAS_TRIED_STREAMING_WITHOUT_WIFI, 'TRUE');
    hasTriedWithoutWifiAlert(handleDismiss, navigation, download);
  }
  return showAlert;
};

const hasTriedDownloadingWithoutWifiAlert = async (handleDismiss: any, navigation: any, download: boolean) => {
  const shouldDownloadWithoutWifi = await AsyncStorage.getItem(PV.Keys.DOWNLOADING_WIFI_ONLY);
  if (shouldDownloadWithoutWifi !== 'TRUE') {
    return false;
  }

  const [netInfoState, hasTried] = await Promise.all([
    NetInfo.fetch(),
    AsyncStorage.getItem(PV.Keys.HAS_TRIED_DOWNLOADING_WITHOUT_WIFI),
  ]);

  const showAlert = netInfoState.type !== 'wifi' && !hasTried;
  if (showAlert) {
    await AsyncStorage.setItem(PV.Keys.HAS_TRIED_DOWNLOADING_WITHOUT_WIFI, 'TRUE');
    hasTriedWithoutWifiAlert(handleDismiss, navigation, download);
  }
  return showAlert;
};

const hasTriedWithoutWifiAlert = (handleDismiss: any, navigation: any, download: boolean) => {
  Alert.alert(
    translate('No Wifi Connection'),
    `You cannot ${download ? 'download' : 'stream'} without a Wifi connection.
    To allow ${download ? 'downloading' : 'streaming'} with your data plan, go to your Settings page.`,
    [
      {
        text: translate('Cancel'),
        style: 'cancel',
        onPress: handleDismiss,
      },
      {
        text: translate('Go to Settings'),
        onPress: async () => {
          await handleDismiss();
          navigation.navigate(PV.RouteNames.SettingsScreen);
        },
      },
    ],
  );
};

export const ActionSheet: IActionSheet = {
  media: {
    moreButtons: mediaMoreButtons,
  },
};
