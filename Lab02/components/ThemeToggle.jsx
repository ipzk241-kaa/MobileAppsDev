import React, { useState } from "react";
import { View, Switch } from "react-native";
import { useTheme } from "../config/ThemeContext";
import styled from "styled-components/native";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(
    theme.background === theme.isDark
  );

  const handleToggle = () => {
    toggleTheme();
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Container>
      <ToggleText color={theme.text1}>Color theme: </ToggleText>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "rgb(255, 230, 0)" : "rgb(38, 34, 34)"}
        background="#3e3e3e"
        onValueChange={handleToggle}
        value={isDarkMode}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
  align-items: center;
  flex-direction: row;
`;

const ToggleText = styled.Text`
  font-size: 20px;
  color: ${(props) => props.color || "black"};
`;

export default ThemeToggle;
