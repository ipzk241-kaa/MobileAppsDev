import React from "react";
import { FlatList, Text } from "react-native";
import { useTheme } from "../config/ThemeContext";
import AuthCodeDisplay from "./AuthCodeDisplay";
import OptionsList from "./OptionsList";
import useAuthCode from "../hooks/useAuthCode";
import styled from "styled-components/native";

const Guard = () => {
  const { theme } = useTheme();
  const { code, progress } = useAuthCode();

  const staticContent = [
    {
      key: "authCode",
      render: () => <AuthCodeDisplay code={code} progress={progress} />,
    },
    {
      key: "description",
      render: () => (
        <DescriptionContainer>
          <DescriptionText color={theme.text1}>
            You'll enter your code each time you enter your password to sign in to your Steam account.
          </DescriptionText>
          <TipText color={theme.text3}>
            Tip: if you don't share your PC, you can select "Remember my password"
            when you sign in to the PC client to enter your password and authenticator code less often.
          </TipText>
        </DescriptionContainer>
      ),
    },
    {
      key: "options",
      render: () => <OptionsList options={options} />,
    },
  ];

  return (
    <FlatList
      data={staticContent}
      renderItem={({ item }) => item.render()}
      keyExtractor={(item) => item.key}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const DescriptionContainer = styled.View`
  padding-horizontal: 15px;
`;

const DescriptionText = styled.Text`
  font-size: 14px;
  font-family: "ABeeZee-Regular";
  margin-bottom: 10px;
  line-height: 22px;
  color: ${(props) => props.color || "black"};
`;

const TipText = styled.Text`
  font-size: 14px;
  font-family: "ABeeZee-Regular";
  margin-bottom: 10px;
  line-height: 22px;
  color: ${(props) => props.color || "black"};
  letter-spacing: -0.15px;
`;

const options = [
  {
    id: "1",
    label: "Remove Authenticator",
    component: <Text style={{ color: "red" }}>Help</Text>,
    icon: "arrow-forward-ios",
  },
  {
    id: "2",
    label: "My Recovery Code",
    component: <Text style={{ color: "red" }}>Remove Auth</Text>,
    icon: "arrow-forward-ios",
  },
  {
    id: "3",
    label: "Help",
    component: <Text style={{ color: "red" }}>Help</Text>,
    icon: "arrow-forward-ios",
  },
];

export default Guard;
