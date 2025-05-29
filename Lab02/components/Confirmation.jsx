import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../config/ThemeContext";
import styled from "styled-components/native";

const Confirmation = () => {
  const { theme } = useTheme();
  return (
    <ConfirmationContainer>
      <StyledText color={theme.text1}>Confirmations Content</StyledText>
    </ConfirmationContainer>
  );
};

const ConfirmationContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  color: ${(props) => props.color || "black"};
`;

export default Confirmation;
