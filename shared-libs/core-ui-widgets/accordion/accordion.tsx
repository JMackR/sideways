import { View, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { Collapsible } from './collapsible-section';
import { BackgroundContainer, Margin, SVG } from '@upward/core-ui-library';
import { ChevronRightIcon } from '@upward/assets';
import { useState } from 'react';
import { useColorForBackgroundColor } from '@upward/themes';
import { MARGIN_GUTTER } from '@upward/constants';
import { ms } from '@upward/utilities';

export const Accordion = (props: any) => {
  const { expandMultiple, sections, underlayColor, touchableProps, renderContent, renderHeader } = props;

  const [activeSections, setActiveSections] = useState<any>([]);
  const background = useColorForBackgroundColor('background');
  const styles = useStyles(background);
  const toggleSection = (section: any) => {
    if (!props.disabled) {
      let updatedSections = [];
      if (activeSections.includes(section)) {
        updatedSections = activeSections.filter((a: any) => a !== section);
      } else if (expandMultiple) {
        updatedSections = [...activeSections, section];
      } else {
        updatedSections = [section];
      }
      setActiveSections(updatedSections.includes(undefined) ? [] : updatedSections);
    }
  };

  const renderContainer =
    (renderCollapsible: any) =>
    ({ item, index }: { item: any; index: number }) => {
      return (
        <View key={index} style={styles.accordionContainer}>
          <TouchableHighlight
            onPress={() => toggleSection(index)}
            underlayColor={underlayColor}
            {...touchableProps}
            accessibilityState={{
              expanded: activeSections.includes(index),
            }}
          >
            <Margin direction="row" crossAxisDistribution="center">
              <BackgroundContainer showShadow style={styles.accordion}>
                {renderHeader(item, index, activeSections.includes(index), sections)}
                <Animated.View
                  style={[
                    {
                      transform: [
                        {
                          rotate: `${activeSections.includes(index) ? '-90' : '90'}deg`,
                        },
                      ],
                      right: 15,
                      backgroundColor: 'transparent',
                    },
                  ]}
                >
                  <SVG
                    localSVG={{
                      ...ChevronRightIcon,
                      size: { width: ms(20), height: ms(20) },
                    }}
                    tint="onBackground"
                  />
                </Animated.View>
              </BackgroundContainer>
            </Margin>
          </TouchableHighlight>
          {renderCollapsible(item, index)}
        </View>
      );
    };

  const renderCollapsible = (section: any, key: number) => {
    return (
      <Collapsible collapsed={!activeSections.includes(key)}>
        {renderContent(section, key, activeSections.includes(key), sections)}
      </Collapsible>
    );
  };

  return (
    <FlatList
      data={sections}
      extraData={activeSections}
      nestedScrollEnabled={true}
      keyExtractor={(item) => item.index.toString()}
      renderItem={renderContainer(renderCollapsible)}
      ListFooterComponent={<QFeedback />}
    />
  );
};
const useStyles = (background: string) =>
  StyleSheet.create({
    accordion: {
      backgroundColor: background,
      width: '100%',
      paddingVertical: 6,
      paddingHorizontal: 6,
      borderRadius: 6,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    accordionContainer: { paddingHorizontal: MARGIN_GUTTER, marginTop: MARGIN_GUTTER },
  });
