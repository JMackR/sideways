import * as React from "react";

import {
  FlatList,
  View,
  useWindowDimensions,
  StyleSheet,
  Linking,
} from "react-native";
import { ChartCard } from "../components/ChartCard";
import { appColors } from "./consts/colors";
import { ChartRoutes } from "./consts/routes";
import { InfoCard } from "../components/InfoCard";

import { Text } from "../components/Text";
import BarChartPage from "./bar-chart";
import BarChartCustomBarsPage from "./bar-charts-custom-bars";
import LineChartPage from "./line-chart";
import PieChart from "./pie-chart";
import PieAndDonutCharts from "./pie-and-donut-charts";
const cards = {
  barchart: BarChartPage,
  barchart2: BarChartCustomBarsPage,
  linechart: LineChartPage,
  piechart: PieChart,
  piedonut: PieAndDonutCharts
}
const layout = ["barchart", 'barchart2', 'linechart', 'piechart', 'piedonut']
export default function LandingPage() {
  const { width } = useWindowDimensions();

  const renderCards = ({ item, index }) => {
    const Card = cards[item]
    return <Card />
  }

  return (
    <View style={styles.view}>
      <FlatList

        contentContainerStyle={{ padding: 10 }}
        numColumns={width < 500 ? 1 : 2}
        contentInsetAdjustmentBehavior="automatic"
        data={layout}
        renderItem={renderCards}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: appColors.viewBackground.light,

  },
});
