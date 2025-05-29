import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomHeader from "../components/Header";
import { useTheme } from "../config/ThemeContext";
import FilterBar from "../components/FilterBar";
import { newsFilters } from "../assets/FiltersData";
import { communityContent } from "../assets/NewsData";
import CommunityContentCardsList from "../components/CommunityContentCardsList";

const Community = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader
        title={"Community"}
        description={
          "Community and official content for all games and software"
        }
      />
      <FilterBar filters={newsFilters} onSelect={() => {}} showSearch={true} />
      <CommunityContentCardsList news={communityContent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Community;