import _ from 'lodash';
import React, { useMemo, forwardRef } from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity, View, Text, Image } from 'react-native';


import { Badge } from './badge';
import { BadgeProps } from './badge.d';
import { AvatarProps } from './avatar.d';


import * as AvatarHelper from './avatar-helper';
import { useColor } from '@upward/themes';
import { Flex } from '@upward/core-ui-library';

export enum BadgePosition {
	TOP_RIGHT = 'TOP_RIGHT',
	TOP_LEFT = 'TOP_LEFT',
	BOTTOM_RIGHT = 'BOTTOM_RIGHT',
	BOTTOM_LEFT = 'BOTTOM_LEFT',
}

const DEFAULT_BADGE_SIZE = 10;

export type AutoColorsProps = {
	/**
	 * Avatar colors to be used when useAutoColors is true
	 */
	avatarColors?: string[];
	/**
	 * Replace the default hashing function (name -> number)
	 */
	hashFunction?: (name?: string) => number;
	/**
	 * Background color in cases where the getBackgroundColor returns undefined.
	 */
	defaultColor?: string;
};

export const Avatar = forwardRef<any, AvatarProps>(
	(
		{
			children,
			onPress,
			ribbonLabel,
			ribbonStyle,
			customRibbon,
			onImageLoadStart,
			onImageLoadEnd,
			onImageLoadError,
			testID,
			label,
			name,
			badgeProps = {},
			imageStyle,
			containerStyle,
			source,
			imageSize,
			badgePosition = BadgePosition.TOP_RIGHT,
			avatarSize = 75,

		}: AvatarProps,
		ref: React.ForwardedRef<any>,
	) => {
		const { size: _badgeSize, borderWidth: badgeBorderWidth = 0 } = badgeProps;
		const badgeSize = _badgeSize || DEFAULT_BADGE_SIZE;
		const { colors } = useColor();
		const url = source;

		const setSize = () => {
			if (typeof imageSize === 'number') {
				return imageSize;
			}
			switch (imageSize) {
				case 'large':
					return 116;
				case 'medium':
					return 80;
				case 'small':
					return 75;
				case 'custom':
					return avatarSize;
				case 'xsmall':
					return 40;
				default:
					return 68;
			}
		};

		const getContainerStyle = () => {
			let avatarDimensions;
			switch (imageSize) {
				default:
				case 'large':
					avatarDimensions = {
						width: setSize(),
						height: setSize(),
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: setSize() / 2,
						borderWidth: 3,
						borderColor: colors.brand,
					};
					break;
				case 'medium':
					avatarDimensions = {
						width: setSize(),
						height: setSize(),
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: setSize() / 2,
						borderWidth: 3,
						borderColor: colors.brand,
					};
					break;
				case 'small':
					avatarDimensions = {
						width: setSize(),
						height: setSize(),
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: setSize() / 2,
						borderWidth: 2,
						borderColor: colors.brand,
					};
					break;

				case 'custom':
					avatarDimensions = {
						width: setSize(),
						height: setSize(),
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: setSize() / 2,
						borderWidth: 3,
						borderColor: '#F7F7F7',
					};
					break;
				case 'xsmall':
					avatarDimensions = {
						width: setSize(),
						height: setSize(),
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: setSize() / 2,

						borderWidth: 2,
						borderColor: colors.brand,
					};
					break;
			}

			return avatarDimensions;
		};

		const getRibbonStyle = () => ({
			position: 'absolute',
			top: '10%',
			left: setSize() / 1.7,
			borderRadius: setSize() / 2,
		});

		const getBadgePosition: StyleProp<ViewStyle> = useMemo(() => {
			const radius = setSize() / 2;
			const x = Math.sqrt(radius ** 2 * 2);
			const y = x - radius;
			const shift = Math.sqrt(y ** 2 / 2) - (badgeSize + badgeBorderWidth * 2) / 2;
			const badgeLocation = _.split(_.toLower(badgePosition), '_', 2);
			return { position: 'absolute', [badgeLocation[0]]: shift, [badgeLocation[1]]: shift };
		}, [setSize(), badgeBorderWidth, badgeSize, badgePosition]);

		const text = useMemo(() => {
			let text = label;
			if (_.isNil(label) && !_.isNil(name)) {
				text = AvatarHelper.getInitials(name);
			}

			return text;
		}, [label, name]);

		const renderImage = () => {
			if (url !== undefined) {
				return (<Image
					style={[{ borderRadius: setSize() / 2 }, StyleSheet.absoluteFillObject, imageStyle]}
					source={{ uri: source }}
					onLoadStart={onImageLoadStart}
					onLoadEnd={onImageLoadEnd}
					onError={onImageLoadError}
					testID={`${testID}.image`}

				/>)
			} else {
				return null
			}
		};

		const renderBadge = () => {
			if (!_.isEmpty(badgeProps)) {
				return (
					<Badge
						testID={`${testID}.onlineBadge`}
						{...badgeProps}
						size={badgeSize}
						containerStyle={getBadgePosition}
					/>
				);
			}
		};

		const renderRibbon = () => {
			if (customRibbon) {
				return (
					<Flex crossAxisDistribution="center" style={getRibbonStyle()}>
						{customRibbon}
					</Flex>
				);
			}
			if (ribbonLabel) {
				return (
					<Flex style={[getRibbonStyle(), styles.ribbon, ribbonStyle]}>
						<Text numberOfLines={1} color={'brand'}>
							{ribbonLabel}
						</Text>
					</Flex>
				);
			}
			return null;
		};

		const textContainerStyle = useMemo(() => {
			const hasImage = !_.isUndefined(source);
			return [
				{
					backgroundColor: colors.lightBackground,
					...StyleSheet.absoluteFillObject,
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: setSize() / 2,
				},
				hasImage && {
					top: 1,
					right: 1,
					bottom: 1,
					left: 1
				},
			];
		}, [source]);

		const Container = onPress ? TouchableOpacity : View;

		return (
			<Container
				style={[getContainerStyle(), containerStyle]}
				ref={ref}
				testID={testID}
			>
				<View testID={`${testID}.container`} style={textContainerStyle}>
					{!_.isUndefined(text) && (
						<Text numberOfLines={1} testID={`${testID}.label`}>
							{text}
						</Text>
					)}
				</View>
				{renderImage()}
				{renderBadge()}
				{renderRibbon()}
				{children}
			</Container>
		);
	},
);
