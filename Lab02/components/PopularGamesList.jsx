import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Text,
  Dimensions,
  Image,
} from "react-native";
import GameCard from "./GameCard";

const { width } = Dimensions.get("window");

const PopularGamesList = ({ games }) => {
  const renderItem = ({ item }) => {
    return <GameCard game={item}></GameCard>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width - 60}
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default PopularGamesList;