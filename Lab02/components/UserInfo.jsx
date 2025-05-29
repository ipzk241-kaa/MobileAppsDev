import React from "react";
import { View, Image } from "react-native";
import { useTheme } from "../config/ThemeContext";
import styled from "styled-components/native";

const UserInfo = ({ name, age, email }) => {
  const { theme } = useTheme();

  return (
    <Container>
      <ProfilePhoto source={require("../assets/images/userProfilePhoto.jpg")} />
      <InfoText color={theme.text1}>Кухар Артем</InfoText>
      <InfoText color={theme.text1}>ІПЗк-24-1</InfoText>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

const ProfilePhoto = styled.Image`
  width: 100px;
  height: 100px;
`;

const InfoText = styled.Text`
  font-family: "ABeeZee-Regular";
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.18px;
  color: ${(props) => props.color || "black"};
`;

export default UserInfo;
