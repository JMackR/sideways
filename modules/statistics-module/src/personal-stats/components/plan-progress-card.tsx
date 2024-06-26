import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { generateRandomNumber } from './utils';
import { calculatePercentage } from './utils';
import { formatNumberWithCommas } from './utils';

import CircularProgressBar from "./progress";
import { useFont } from "@shopify/react-native-skia";
const RADIUS = 120;
const STROKE_WIDTH = 30;
const GOALS = 100000;
export const PlanProgress = () => {
    const [balance, setBalance] = useState(0);
    const end = useSharedValue(0);
    const percentage = useSharedValue(0);
    const font = useFont(require('../../../../../shared-libs/assets/fonts/Roboto-Bold.ttf'), 60);
    const handlePress = () => {
        const generateRandomValue = generateRandomNumber(GOALS);
        const generatePercentage = calculatePercentage(generateRandomValue, GOALS);
        setBalance(generateRandomValue);
        percentage.value = withTiming(generatePercentage, { duration: 1000 });
        end.value = withTiming(generatePercentage / 100, { duration: 1000 });
    };


    if (!font) {
        return null;
    }
    return (
        <View style={styles.container}>
            <CircularProgressBar
                radius={RADIUS}
                strokeWidth={STROKE_WIDTH}
                font={font}
                percentage={percentage}
                end={end}
            />

            <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
                <Text style={{ color: 'white' }} >Random</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
});