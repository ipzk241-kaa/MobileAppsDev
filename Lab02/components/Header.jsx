import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useTheme } from "../config/ThemeContext";

const CustomHeader = ({
  title,
  description,
  isSearchEnabled = false,
  onSearch,
}) => {
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

  return (
    <View>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Image
            style={[styles.logo, { tintColor: theme.logoColor }]}
            source={require("../assets/images/logo.png")}
          />
          <Text style={[styles.headerText, { color: theme.text1 }]}>
            {title}
          </Text>
        </View>
        <View style={styles.headerSearch}>
          {isSearchEnabled && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {isSearchActive ? (
                <TextInput
                  style={styles.searchInput}
                  placeholder="Пошук..."
                  value={searchQuery}
                  onChangeText={(text) => {
                    setSearchQuery(text);
                    if (onSearch) onSearch(text);
                  }}
                />
              ) : (
                <TouchableOpacity onPress={handleSearchPress}>
                  <Image
                    source={require("../assets/images/search_icon.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              )}

              {isSearchActive && (
                <TouchableOpacity onPress={handleCloseSearch}>
                  <Image
                    source={require("../assets/images/close_icon.png")}
                    style={[styles.icon, { tintColor: theme.icon_color }]}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
      {description && (
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={[styles.description, { color: theme.text2 }]}>
            {description}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    gap: 10,
    paddingTop: 45,
    height: 80,
    marginBottom: 10,
  },
  headerText: {
    fontFamily: "ABeeZee-Regular",
    color: "white",
    fontSize: 28,
  },
  logo: {
    width: 36,
    height: 36,
  },
  headerSearch: {
    flex: 1,
    alignItems: "flex-end",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    height: 40,
    marginRight: 10,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: "cover",
  },
  description: {
    fontSize: 14,
    fontFamily: "ABeeZee-Regular",
    marginBottom: 20,
  },
});

export default CustomHeader;
