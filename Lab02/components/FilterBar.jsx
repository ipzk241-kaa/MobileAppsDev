import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const FilterBar = ({ filters, onSelect, showSearch = false }) => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [searchText, setSearchText] = useState("");

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    onSelect(filter);
  };

  return (
    <View style={styles.container}>
      {showSearch && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
        />
      )}
      <FlatList
        data={filters}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === item && styles.activeFilter,
            ]}
            onPress={() => handleFilterPress(item)}
          >
            <Text style={[styles.filterText]}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#2a2d3a",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#2a2d3a",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: "#3cbef6",
  },
  filterText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
  },
});

export default FilterBar;