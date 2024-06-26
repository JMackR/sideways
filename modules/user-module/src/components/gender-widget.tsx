import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, RadioButtonSelected, RadioButtonUnselected } from '@upward/assets';
import { Input, Margin, SVG, Text, Button } from '@upward/core-ui-library';
import { NavigationBar, NavigationBarProps, Screen, } from '@upward/core-ui-widgets';
import { NavigableRoute } from '@upward/navigation';
import { BASE_MARGINS, } from './constants';
import { ScrollView } from 'react-native';
import { useState } from 'react';

export const Gender = ({ fields, onFieldChange }) => {
    return (
        <Margin marginStep={2} marginLeftStep={4} marginRightStep={4}>
            <Text textType='bodyMedium1'>Gender</Text>
            <Margin direction='row' marginStep={2}>
                <Margin direction='row' crossAxisDistribution='center' marginRightStep={10}>
                    <Margin direction='row' crossAxisDistribution='center' marginRightStep={3}>
                        <SVG localSVG={{ SVG: fields['gender'] === true ? RadioButtonSelected.SVG : RadioButtonUnselected.SVG, size: { height: 20, width: 20 } }} onPress={() => onFieldChange({ fieldName: 'gender', text: !fields['gender'] })} />
                    </Margin>
                    <Text textType="bodyRegular2">Male</Text>
                </Margin>
                <Margin direction='row' crossAxisDistribution='center'>
                    <Margin direction='row' crossAxisDistribution='center' marginRightStep={3}>
                        <SVG localSVG={{ SVG: fields['gender'] === false ? RadioButtonSelected.SVG : RadioButtonUnselected.SVG, size: { height: 20, width: 20 } }} onPress={() => onFieldChange({ fieldName: 'gender', text: !fields['gender'] })} />
                    </Margin>
                    <Text textType="bodyRegular2">Female</Text>
                </Margin>
            </Margin>
        </Margin>
    )
}