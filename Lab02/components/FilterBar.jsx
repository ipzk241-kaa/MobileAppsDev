import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "../config/ThemeContext";
import styled from "styled-components/native";

const FilterBar = ({ filters, onSelect, showSearch = false, onSearch }) => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { theme } = useTheme();

  const handleSearchPress = () => {
    setIsSearchActive(true);
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setSearchQuery("");
    if (onSearch) onSearch("");
  };

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    onSelect(filter);
  };

  return (
    <Container>
      {showSearch && (
        <FilterButton backgroundColor={theme.filterBg}>
          {isSearchActive ? (
            <SearchInput
              backgroundColor={theme.filterBg}
              placeholder="Пошук..."
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                if (onSearch) onSearch(text);
              }}
            />
          ) : (
            <TouchableOpacity onPress={handleSearchPress}>
              <Icon source={require("../assets/images/search_icon.png")} />
            </TouchableOpacity>
          )}

          {isSearchActive && (
            <TouchableOpacity onPress={handleCloseSearch}>
              <Icon
                source={require("../assets/images/close_icon.png")}
                tintColor={theme.icon_color}
              />
            </TouchableOpacity>
          )}
        </FilterButton>
      )}
      {!isSearchActive && (
        <FlatList
          data={filters}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <FilterButton
              backgroundColor={theme.filterBg}
              style={selectedFilter === item && styles.activeFilter}
              onPress={() => handleFilterPress(item)}
            >
              <FilterText>{item}</FilterText>
            </FilterButton>
          )}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  padding-vertical: 10px;
  padding-horizontal: 16px;
  align-items: center;
`;

const FilterButton = styled.TouchableOpacity`
  border-radius: 8px;
  padding-vertical: 8px;
  padding-horizontal: 14px;
  margin-right: 10px;
  background-color: ${(props) => props.backgroundColor || "transparent"};
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  background-color: ${(props) => props.backgroundColor || "white"};
  border-radius: 8px;
  height: 40px;
  margin-right: 10px;
  color: #fff;
  padding: 10px;
`;

const FilterText = styled.Text`
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
`;

const Icon = styled.Image`
  width: 16px;
  height: 16px;
  object-fit: cover;
  fill: ${(props) => props.icon_color};
`;

const styles = {
  activeFilter: {
    backgroundColor: "#3cbef6",
  },
};

export default FilterBar;