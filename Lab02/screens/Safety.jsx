import React from "react";
import { View, StyleSheet } from "react-native";
import TabMenu from "../components/TabMenu";
import Guard from "../components/Guard";
import Confirmation from "../components/Confirmation";
import CustomHeader from "../components/Header";
import { useTheme } from "../config/ThemeContext";

const Safety = () => {
  const { theme } = useTheme();
  const tabs = [
    {
      id: "Guard",
      label: "Guard",
      component: <Guard />,
    },
    {
      id: "Confirmations",
      label: "Confirmations",
      component: <Confirmation />,
    },
  ];
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title="Safety" />
      <TabMenu tabs={tabs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Safety;