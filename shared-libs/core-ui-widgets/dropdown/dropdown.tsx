import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native';

import { Margin, SVG, Text } from '@upward/core-ui-library';
import { ChevronRightIcon } from '@upward/assets';
import { DropdownProps } from './dropdown-props';
import { useColorForBackgroundColor } from '@upward/themes';
// import { useAppDispatch } from '@upward/store';
// import { setDropdownSelection } from '../../../bswift/src/screens/Documents/NewDocumentForm/form-slices';

export const Dropdown = (props: DropdownProps) => {
  const { placeholder, items, title, background, color, setValue } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [dropdownItems, setDropdownItems] = useState<any>([]);
  const [lastItem, setLastItem] = useState<any>(null);
  const dropdownRef = useRef(null);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (items.length > 0) {
      setLastItem(() => items[items.length - 1]);
      setDropdownItems(() => [...items]);
    } else {
      setDropdownItems([{ label: 'There are not items to display.', value: 'no-items' }]);
    }
  }, [items, setDropdownItems]);

  // Set value from prop
  useEffect(() => {
    if (setValue) {
      setSelectedValue(setValue);
    }
  }, [setValue, setSelectedValue]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (value: any) => {
    // dispatch(setDropdownSelection(value));
    setSelectedValue(value);
    toggleDropdown();
  };

  return (
    <>
      {title && (
        <View style={{ zIndex: -1 }}>
          <Margin marginBottomStep={2} marginTopStep={2}>
            <Text textType="headerMedium2">{title}</Text>
          </Margin>
        </View>
      )}
      <View
        style={{
          zIndex: isDropdownOpen ? 1000 : -1,
        }}
      >
        <Pressable
          onPress={() => toggleDropdown()}
          style={[
            styles.button,
            {
              backgroundColor: useColorForBackgroundColor(background),
              borderBottomLeftRadius: isDropdownOpen ? 0 : 6,
              borderBottomRightRadius: isDropdownOpen ? 0 : 6,
              borderBottomWidth: isDropdownOpen ? 0 : 1,
            },
          ]}
          ref={dropdownRef}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: background,
            }}
          >
            <Text textType="bodyMedium2" color={color}>
              {selectedValue || placeholder}
            </Text>
            <View
              style={{
                transform: [
                  {
                    rotate: isDropdownOpen ? '-90deg' : '90deg',
                  },
                ],
              }}
            >
              <SVG
                localSVG={{
                  SVG: ChevronRightIcon.SVG,
                  size: {
                    width: 20,
                    height: 20,
                  },
                }}
                tint="onBackground"
              />
            </View>
          </View>
        </Pressable>

        {isDropdownOpen && dropdownItems && (
          <View
            style={[
              styles.dropdown,
              {
                backgroundColor: useColorForBackgroundColor(background),
                zIndex: isDropdownOpen ? 1000 : -1,
                borderTopWidth: isDropdownOpen ? 0 : 1,
              },
            ]}
          >
            <ScrollView scrollEnabled={true}>
              {dropdownItems &&
                dropdownItems.length > 0 &&
                dropdownItems.map((item, index) => {
                  return (
                    <Pressable
                      onPress={() => handleSelect(item.label)}
                      key={index}
                      style={[
                        styles.dropdownItem,
                        {
                          borderBottomWidth: lastItem === item ? 0 : 1,
                        },
                      ]}
                    >
                      <Text textType="bodyRegular2" color={color}>
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
            </ScrollView>
            {/* <FlatList
              data={dropdownItems}
              scrollEnabled
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => handleSelect(item.label)}
                  key={index}
                  style={[
                    styles.dropdownItem,
                    {
                      borderBottomWidth: lastItem === item ? 0 : 1,
                    },
                  ]}
                >
                  <Text textType="bodyRegular2" color={color}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            /> */}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    backgroundColor: 'white',
    height: 'auto',
    marginBottom: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 41,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    maxHeight: 130,
    height: 130,
    minHeight: 40,
    paddingVertical: 5,
    borderWidth: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
