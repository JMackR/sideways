import { Pressable, StyleSheet, View as RNView } from 'react-native';
import React from 'reactn';
// import { hasValidNetworkConnection } from '../lib/network'
import { FlatList, Icon, NavHeaderButtonText, Text, View } from '../components';
import { generateSections } from '../lib/filters';
import { translate } from '../lib/i18n';
import { safeKeyExtractor } from '../lib/utility';
import { PV } from '../resources';
import { getDefaultCategory } from '../services/category';
import { trackPageView } from '../services/tracking';

type Props = {
  navigation?: any;
};

type State = {
  flatCategoryItems?: any[];
  sections?: any;
  selectedCategoryItemKey?: string;
  selectedCategorySubItemKey?: string;
  selectedFilterItemKey?: string;
  selectedFromItemKey?: string;
  selectedSortItemKey?: string;
  screenName: string;
  isOffline: boolean;
};

type Item = {
  label?: string;
  value?: string;
  parentId?: string;
  id?: string;
};

type Section = {
  title?: string;
  data?: Item[];
  value?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
};

const testIDPrefix = 'filter_screen';

export class FilterScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const flatCategoryItems = this.props.route.params.flatCategoryItems || [];

    this.state = {
      flatCategoryItems,
      screenName: '',
      sections: [],
      selectedCategoryItemKey: '',
      selectedCategorySubItemKey: '',
      selectedFilterItemKey: '',
      selectedFromItemKey: '',
      selectedSortItemKey: '',
      isOffline: false,
    };
  }

  static navigationOptions = ({ navigation, route }) => {
    const filterScreenTitle = route.params.filterScreenTitle;

    return {
      title: filterScreenTitle || '',
      headerLeft: () => null,
      headerRight: () => (
        <NavHeaderButtonText
          accessibilityHint={translate('ARIA HINT - dismiss this screen')}
          accessibilityLabel={translate('Done')}
          handlePress={navigation.dismiss}
          testID={testIDPrefix}
          text={translate('Done')}
        />
      ),
    };
  };

  componentDidMount() {
    trackPageView('/filter', 'Filter Screen');
    const { navigation, route } = this.props;
    const { flatCategoryItems } = this.state;
    const addByRSSPodcastFeedUrl = route.params.addByRSSPodcastFeedUrl;
    const hasSeasons = route.params.hasSeasons;
    const screenName = route.params.screenName;
    const selectedCategoryItemKey = route.params.selectedCategoryItemKey;
    const selectedCategorySubItemKey = route.params.selectedCategorySubItemKey;
    const selectedFilterItemKey = route.params.selectedFilterItemKey;
    const selectedFromItemKey = route.params.selectedFromItemKey;
    const selectedSortItemKey = route.params.selectedSortItemKey;

    const { newSelectedSortItemKey, sections } = generateSections({
      addByRSSPodcastFeedUrl,
      flatCategoryItems,
      hasSeasons,
      screenName,
      selectedCategoryItemKey,
      selectedCategorySubItemKey,
      selectedFilterItemKey,
      selectedFromItemKey,
      selectedSortItemKey,
    });

    this.setState({
      screenName,
      sections,
      selectedCategoryItemKey,
      selectedCategorySubItemKey,
      selectedFilterItemKey,
      selectedFromItemKey,
      selectedSortItemKey: newSelectedSortItemKey,
    });
  }

  getNewLocalState = async (section: Section, item: Item) => {
    const {
      flatCategoryItems,
      screenName,
      selectedCategoryItemKey,
      selectedCategorySubItemKey,
      selectedFilterItemKey,
      selectedFromItemKey,
      selectedSortItemKey,
    } = this.state;

    const addByRSSPodcastFeedUrl = this.props.route.params.addByRSSPodcastFeedUrl;
    const options = { addByRSSPodcastFeedUrl, flatCategoryItems, screenName } as any;

    if (section.value === PV.Filters._sectionFromKey) {
      options.selectedFromItemKey = item.value;
      options.selectedFilterItemKey = selectedFilterItemKey;
      options.selectedSortItemKey = selectedSortItemKey;
    } else if (section.value === PV.Filters._sectionFilterKey) {
      options.selectedFilterItemKey = item.value;
      options.selectedSortItemKey = selectedSortItemKey;
      if (item.value === PV.Filters._categoryKey) {
        const defaultCategory = await getDefaultCategory();
        options.selectedCategoryItemKey = defaultCategory?.id;
      }
    } else if (section.value === PV.Filters._sectionCategoryKey) {
      if (item.parentId) {
        options.selectedCategorySubItemKey = item.value || item.id;
        options.selectedCategoryItemKey = item.parentId;
      } else {
        options.selectedCategoryItemKey = item?.value || item?.id;
      }
      options.selectedFilterItemKey = selectedFilterItemKey;
      options.selectedSortItemKey = selectedSortItemKey;
    } else if (section.value === PV.Filters._sectionSortKey) {
      options.selectedSortItemKey = item?.value;
      options.selectedFilterItemKey = selectedFilterItemKey;
      options.selectedCategoryItemKey = selectedCategoryItemKey;
      options.selectedCategorySubItemKey = selectedCategorySubItemKey;
      options.selectedFromItemKey = selectedFromItemKey;
    }

    const hasSeasons = this.props.route.params.hasSeasons;
    if (hasSeasons) {
      options.hasSeasons = true;
    }

    const {
      newSelectedCategoryItemKey,
      newSelectedCategorySubItemKey,
      newSelectedFilterItemKey,
      newSelectedFromItemKey,
      newSelectedSortItemKey,
      sections,
    } = generateSections(options);

    return {
      selectedCategoryItemKey: newSelectedCategoryItemKey,
      selectedCategorySubItemKey: newSelectedCategorySubItemKey,
      selectedFilterItemKey: newSelectedFilterItemKey,
      selectedFromItemKey: newSelectedFromItemKey,
      selectedSortItemKey: newSelectedSortItemKey,
      sections,
    };
  };

  getSelectHandler = async (section: Section, item: Item) => {
    const { navigation, route } = this.props;
    let handleSelect: any;
    let categoryValueOverride = '';
    if (section.value === PV.Filters._sectionFromKey) {
      handleSelect = route.params.handleSelectFromItem;
    } else if (section.value === PV.Filters._sectionFilterKey) {
      if (item.value === PV.Filters._categoryKey) {
        handleSelect = route.params.handleSelectCategoryItem;
        const defaultCategory = await getDefaultCategory();
        categoryValueOverride = defaultCategory.id;
      } else {
        handleSelect = route.params.handleSelectFilterItem;
      }
    } else if (section.value === PV.Filters._sectionCategoryKey) {
      if (item.value && !item.parentId) {
        handleSelect = route.params.handleSelectCategoryItem;
      } else {
        handleSelect = route.params.handleSelectCategorySubItem;
      }
    } else if (section.value === PV.Filters._sectionSortKey) {
      handleSelect = route.params.handleSelectSortItem;
    }
    return { categoryValueOverride, handleSelect };
  };

  renderItem = ({ item, section }) => {
    const {
      selectedCategoryItemKey,
      selectedCategorySubItemKey,
      selectedFilterItemKey,
      selectedFromItemKey,
      selectedSortItemKey,
    } = this.state;

    const value = item?.value || item?.id;

    /* Do not render category cells unless the category filter is active. */
    if (
      section.value === PV.Filters._sectionCategoryKey &&
      selectedFilterItemKey === PV.Filters._categoryKey &&
      selectedCategoryItemKey &&
      item.parentId &&
      selectedCategoryItemKey !== item.parentId
    ) {
      return <RNView />;
    }

    let isActive = false;
    if (section.value === PV.Filters._sectionCategoryKey) {
      if (selectedCategorySubItemKey) {
        if (item?.parentId && item?.id === selectedCategorySubItemKey) {
          isActive = true;
        }
      } else if (item.value && item.value === selectedCategoryItemKey) {
        isActive = true;
      }
    } else {
      isActive = [selectedFilterItemKey, selectedFromItemKey, selectedSortItemKey].includes(value);
    }

    const isSubCategory = item.parentId;
    const itemTextStyle = isSubCategory ? [styles.itemSubText] : [styles.itemText];

    const accessibilityHint = `${isActive ? translate('ARIA HINT - Currently selected filter') : ''}`;

    return (
      <Pressable
        accessibilityHint={accessibilityHint}
        accessibilityLabel={item.labelShort || item.label || item.title}
        importantForAccessibility="yes"
        onPress={async () => {
          if (this.state.isOffline) {
            // We don't want filters to be selectable when offline
            return;
          }

          const { categoryValueOverride, handleSelect } = await this.getSelectHandler(section, item);
          const newState = (await this.getNewLocalState(section, item)) as any;

          this.setState(newState, () => {
            handleSelect(categoryValueOverride || value);
          });
        }}
        testID={`${testIDPrefix}_${value}`.prependTestId()}
      >
        <View style={styles.itemWrapper}>
          <Text
            importantForAccessibility="no-hide-descendants"
            style={[itemTextStyle, isActive ? { fontWeight: PV.Fonts.weights.extraBold, color: PV.Colors.white } : {}]}
          >
            {item.labelShort || item.label || item.title}
          </Text>
          {isActive && (
            <Icon name="check" size={24} style={styles.itemIcon} testID={`${testIDPrefix}_${value}_check`} />
          )}
          {!isActive && this.state.isOffline && item.key !== PV.Filters._downloadedKey && (
            <Icon name="times" size={24} style={styles.unavailableIcon} testID={`${testIDPrefix}_${value}_times`} />
          )}
        </View>
      </Pressable>
    );
  };

  render() {
    const { sections } = this.state;

    return (
      <View style={styles.view} testID={`${testIDPrefix}_view`}>
        <FlatList
          disableNoResultsMessage
          keyExtractor={(item: any, index: number) => safeKeyExtractor(testIDPrefix, index, item?.value || item?.id)}
          ItemSeparatorComponent={() => <></>}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionItemWrapper}>
              <Text
                accessible
                accessibilityHint={section.accessibilityHint}
                accessibilityLabel={section.title}
                accessibilityRole={section.accessibilityRole}
                style={styles.sectionItemText}
              >
                {section.title}
              </Text>
            </View>
          )}
          renderItem={this.renderItem}
          sections={sections}
          testID={testIDPrefix}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hideItem: {
    height: 0,
  },
  itemIcon: {
    marginTop: 4,
    marginRight: 36,
    color: PV.Colors.brandBlueLight,
  },
  unavailableIcon: {
    marginTop: 4,
    marginRight: 36,
    color: PV.Colors.grayDark,
  },
  itemSubText: {
    fontSize: PV.Fonts.sizes.xxxl,
    fontWeight: PV.Fonts.weights.thin,
    paddingLeft: 64,
    paddingRight: 36,
    color: PV.Colors.grayLighter,
  },
  itemText: {
    fontSize: PV.Fonts.sizes.xxxl,
    fontWeight: PV.Fonts.weights.thin,
    paddingHorizontal: 36,
    color: PV.Colors.grayLighter,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionItemText: {
    fontSize: PV.Fonts.sizes.xxxl,
    fontWeight: PV.Fonts.weights.bold,
    paddingHorizontal: 16,
  },
  sectionItemWrapper: {
    marginBottom: 20,
    marginTop: 28,
  },
  view: {
    backgroundColor: 'blue',
    flex: 1,
  },
});
