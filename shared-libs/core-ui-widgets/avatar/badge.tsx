import _ from 'lodash';
import {
	ImageSourcePropType,
	ImageStyle,
	StyleProp,
	StyleSheet,
	TextStyle,
	TouchableOpacityProps,
	ViewStyle,
	ViewProps,
	TouchableOpacity,
	View,
	Text,
} from 'react-native';

import { SVG, isJSXElement, isLocalSVGSource } from '@upward/core-ui-library';

const LABEL_FORMATTER_VALUES = [1, 2, 3, 4] as const;

type LabelFormatterValues = (typeof LABEL_FORMATTER_VALUES)[number];

export type BadgeProps = ViewProps &
	TouchableOpacityProps & {
		/**
		 * Text to show inside the badge.
		 * Not passing a label (undefined) will present a pimple badge.
		 */
		label?: string;
		/**
		 * Color of the badge background
		 */
		backgroundColor?: string;
		/**
		 * the badge size
		 */
		size?: number;
		/**
		 * Press handler
		 */
		iconTint?: string
		onPress?: (props: any) => void;
		/**
		 * Defines how far a touch event can start away from the badge.
		 */
		hitSlop?: ViewProps['hitSlop'];
		/**
		 * width of border around the badge
		 */
		borderWidth?: number;
		/**
		 * radius of border around the badge
		 */
		borderRadius?: number;
		/**
		 * color of border around the badge
		 */
		borderColor?: ImageStyle['borderColor'];
		/**
		 * Additional styles for the top container
		 */
		containerStyle?: StyleProp<ViewStyle>;
		/**
		 * Additional styles for the badge label
		 */
		labelStyle?: TextStyle;
		/**
		 * Receives a number from 1 to 4, representing the label's max digit length.
		 * Beyond the max number for that digit length, a "+" will show at the end.
		 * If set to a value not included in LABEL_FORMATTER_VALUES, no formatting will occur.
		 * Example: labelLengthFormater={2}, label={124}, label will present "99+".
		 */
		labelFormatterLimit?: LabelFormatterValues;
		/**
		 * Renders an icon badge
		 */
		icon?: ImageSourcePropType;
		/**
		 * Additional styling to badge icon
		 */
		iconStyle?: object;
		/**
		 * Additional props passed to icon
		 */
		iconProps?: object;
		/**
		 * Custom element to render instead of an icon
		 */
		customElement?: JSX.Element;
		key?: string | number;
	};

export const Badge = (props: BadgeProps) => {
	const {
		activeOpacity,
		backgroundColor,
		containerStyle,
		hitSlop,
		testID,
		onPress,
		icon,
		label,
		size,
		borderWidth,
		labelStyle,
		borderColor,
		borderRadius,
		labelFormatterLimit,
		customElement,
		iconTint,
		...others
	} = props;

	const styles = createStyles(props);

	const checkSize = size || 20;
	const isSmallBadge = () => checkSize <= 16;

	const getBadgeSizeStyle = () => {
		const label = getFormattedLabel();

		const style: any = {
			paddingHorizontal: isSmallBadge() ? 4 : 6,
			height: size,
			minWidth: size,
		};
		if (icon && label) {
			style.paddingRight = 6;
			style.paddingLeft = 4;
			style.height = 20;
			if (borderWidth) {
				style.height += borderWidth * 2;
			}
			return style;
		}
		if (customElement) {
			return style;
		}
		const isPimple = label === undefined;
		if (isPimple || icon) {
			style.paddingHorizontal = 0;
			style.minWidth = undefined;
			style.width = style.height;
			if (borderWidth) {
				style.height += borderWidth * 2;
				style.width += borderWidth * 2;
			}
			return style;
		}

		if (borderWidth) {
			style.height += borderWidth * 2;
			style.minWidth += borderWidth * 2;
		}
		return style;
	};

	const getFormattedLabel = () => {
		if (_.isNaN(label)) {
			return label;
		}
		if (LABEL_FORMATTER_VALUES.includes(labelFormatterLimit!)) {
			const maxLabelNumber: any = 10 ** labelFormatterLimit! - 1;
			let formattedLabel: any = label;
			if (formattedLabel > maxLabelNumber) {
				formattedLabel = `${maxLabelNumber}+`;
			}
			return formattedLabel;
		} else {
			return label;
		}
	};

	const getBorderStyling = () => {
		const style: ViewStyle = {};
		if (borderWidth) {
			style.borderWidth = borderWidth;
			style.borderColor = borderColor;
		}
		if (borderRadius) {
			style.borderRadius = borderRadius;
		}
		return style;
	};

	const renderLabel = () => {
		if (label) {
			return (
				<Text
					style={[isSmallBadge() && styles.labelSmall, labelStyle]}
					allowFontScaling={false}
					numberOfLines={1}
					testID="badge"
				>
					{getFormattedLabel()}
				</Text>
			);
		} else {
			return null;
		}
	};

	const renderCustomElement = () => {
		return customElement;
	};

	const checkIcon = () => {
		let iconJSX;
		if (isJSXElement(icon)) {
			iconJSX = icon;
		} else if (isLocalSVGSource(icon)) {
			iconJSX = <SVG localSVG={{ SVG: icon.SVG, size: { height: checkSize * 0.8, width: checkSize * 0.8 } }} tint={iconTint} />;
		} else {
			return undefined;
		}

		return iconJSX;
	};
	const renderIcon = () => icon && <>{checkIcon()}</>;

	const backgroundStyle = backgroundColor && { backgroundColor };
	const sizeStyle = getBadgeSizeStyle();
	const borderStyle = getBorderStyling();

	return (
		<View style={containerStyle} {...others}>
			<TouchableOpacity
				testID={testID}
				style={[sizeStyle, styles.badge, borderStyle, backgroundStyle]}
				onPress={onPress}
				activeOpacity={activeOpacity}
				hitSlop={hitSlop}
			>
				{renderCustomElement()}
				{renderIcon()}
				{renderLabel()}
			</TouchableOpacity>
		</View>
	);
};

function createStyles(props: BadgeProps) {
	const styles = StyleSheet.create({
		badge: {
			alignSelf: 'flex-start',
			borderRadius: 50,
			backgroundColor: !props.icon || props.customElement ? '#000' : undefined,
			alignItems: 'center',
			justifyContent: 'center',
			overflow: 'hidden',
		},
		label: {
			color: '#000',
			backgroundColor: 'transparent',
		},
		labelSmall: {
			lineHeight: undefined,
		},
	});

	return styles;
}
