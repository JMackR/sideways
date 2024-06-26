import { Screen, } from '@upward/core-ui-widgets';
import { ScrollView, Text, View } from 'react-native';
import BarChartScreen from './components/barchart/barchart';
import LineChartScreen from './components/linechart/linechart';

export const History = () => {



    return (

        <ScrollView style={{ flex: 1 }}>
            <BarChartScreen />
            <LineChartScreen />
        </ScrollView>

    );
};
