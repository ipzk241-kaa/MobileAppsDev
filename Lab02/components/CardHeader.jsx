import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/MaterialIcons";

const CardHeaderStyled = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;

const LogoStyled = styled.Image`
  width: 34px;
  height: 34px;
  border-radius: 50px;
`;

const SourceStyled = styled.View`
  justify-content: center;
`;

const SourceInfoStyled = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const SourceNameStyled = styled.Text`
  font-family: "pingfang-sc-regular";
  font-size: 16px;
  color: ${({ theme }) => theme.text1};
`;

const SourceTypeStyled = styled.Text`
  font-family: "pingfang-sc-regular";
  font-size: 8px;
  color: rgba(255, 255, 255, 1);
  background-color: rgb(174, 31, 150);
  padding-horizontal: 4px;
  padding-vertical: 2px;
  border-radius: 5px;
`;

const PublishedStyled = styled.Text`
  font-family: "ABeeZee-Regular";
  color: rgba(123, 141, 157, 1);
`;

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    width: 150,
  },
  optionWrapper: {
    padding: 10,
  },
  optionText: {
    color: "#333",
    fontSize: 16,
  },
};

const CardHeader = ({ source, published, onMenuPress, theme }) => {
  return (
    <CardHeaderStyled>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <LogoStyled source={source.logo} />
        <SourceStyled>
          <SourceInfoStyled>
            <SourceNameStyled theme={theme}>{source.name}</SourceNameStyled>
            <SourceTypeStyled>{source.type.toUpperCase()}</SourceTypeStyled>
          </SourceInfoStyled>
          <PublishedStyled>
            {published.date} • {published.time}
          </PublishedStyled>
        </SourceStyled>
      </View>
      <Menu>
        <MenuTrigger>
          <Icon name="more-horiz" size={24} color="rgba(75, 86, 100, 1)" />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption onSelect={() => alert("Shared!")} text="Share" />
          <MenuOption onSelect={() => alert("Saved!")} text="Save" />
          <MenuOption onSelect={() => alert("Reported!")} text="Report" />
        </MenuOptions>
      </Menu>
    </CardHeaderStyled>
  );
};

export default CardHeader;
