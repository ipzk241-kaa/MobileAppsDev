import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useTheme } from "../config/ThemeContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components/native";

const OptionsList = ({ options }) => {
  const { theme } = useTheme();
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handlePress = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedItemId === item.id;

    return (
      <View>
        <OptionItem
          backgroundColor={theme.optionBG}
          onPress={() => handlePress(item.id)}
        >
          <OptionText color={theme.text1}>{item.label}</OptionText>
          {item.icon && (
            <Icon name={item.icon} size={20} color={theme.iconNonActive} />
          )}
        </OptionItem>
        {isExpanded && item.component && (
          <ExpandedContent>{item.component}</ExpandedContent>
        )}
      </View>
    );
  };

  return (
    <ListContainer>
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ListContainer>
  );
};

const ListContainer = styled.View`
  padding-horizontal: 15px;
`;

const OptionItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 1px;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

const OptionText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.color || "black"};
`;

const ExpandedContent = styled.View`
  padding: 15px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export default OptionsList;
