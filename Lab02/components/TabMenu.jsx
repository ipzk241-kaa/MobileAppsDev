import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../config/ThemeContext";
import styled from "styled-components/native";

const TabMenu = ({
  tabs = [],
  initialTab = tabs[0]?.id,
  tabContainerStyle,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  contentContainerStyle,
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(initialTab);

  const renderTab = (item) => (
    <Tab
      key={item.id}
      style={[tabStyle, activeTab === item.id && activeTabStyle]}
      backgroundColor={
        activeTab === item.id ? theme.tabActive : theme.tabInactive
      }
      onPress={() => setActiveTab(item.id)}
    >
      <TabText
        style={tabTextStyle}
        color={activeTab === item.id ? theme.text1 : theme.text2}
      >
        {item.label}
      </TabText>
    </Tab>
  );

  const renderContent = () => {
    const activeTabConfig = tabs.find((tab) => tab.id === activeTab);
    return activeTabConfig ? activeTabConfig.component : null;
  };

  return (
    <Container backgroundColor={theme.background}>
      <TabContainer
        style={tabContainerStyle}
        backgroundColor={theme.borderColor}
      >
        <TabRow>{tabs.map((item) => renderTab(item))}</TabRow>
      </TabContainer>
      <ContentContainer style={contentContainerStyle}>
        {renderContent()}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

const TabContainer = styled.View`
  justify-content: space-between;
  border-radius: 7px;
  padding: 2px;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

const TabRow = styled.View`
  flex-direction: row;
  width: 100%;
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

const TabText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.color || "black"};
`;

const ContentContainer = styled.View`
  flex: 1;
`;

export default TabMenu;
