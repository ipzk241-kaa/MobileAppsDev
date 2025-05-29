import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { useTheme } from "../config/ThemeContext";
import PopularGamesList from "../components/PopularGamesList";
import { popularGames, games } from "../assets/GamesData";
import { gamesFilters } from "../assets/FiltersData";
import GamesList from "../components/GameList";
import FilterBar from "../components/FilterBar";

const Store = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title={"Store"} isSearchEnabled={true} />
      <View>
        <PopularGamesList games={popularGames} />
        <FilterBar filters={gamesFilters} onSelect={() => {}} />
        <GamesList games={games}></GamesList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  title: {},
});

export default Store;