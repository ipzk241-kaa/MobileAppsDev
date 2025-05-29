import React from "react";
import { Dimensions, View } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../config/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

const Container = styled(View)`
`;

const BackgroundImage = styled.ImageBackground`
  width: ${screenWidth}px;
  justify-content: center;
  align-items: center;
`;

const GradientOverlay = styled(LinearGradient)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 40px;
`;

const LoggedInText = styled.Text`
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
  color: ${({ theme }) => theme.text2};
`;

const CodeContainer = styled.View`
  align-items: center;
  margin-bottom: 15px;
`;

const CodeText = styled.Text`
  font-size: 54px;
  font-weight: bold;
  letter-spacing: 2px;
  text-align: center;
  color: ${({ theme }) => theme.text3};
`;

const ProgressBar = styled.View`
  width: 150px;
  height: 10px;
  background-color: rgba(28, 32, 44, 1);
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
`;

const Progress = styled.View`
  height: 100%;
  background-color: #00afff;
  border-radius: 5px;
  width: ${({ progress }) => `${progress * 100}%`};
`;

const AuthCodeDisplay = ({ code, progress }) => {
  const { theme } = useTheme();

  return (
    <Container>
      <BackgroundImage
        source={require("../assets/images/bg_gradient.png")}
        resizeMode="cover"
      >
        <GradientOverlay
          colors={[theme.gradientStart, theme.gradientMid, theme.gradientEnd]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <Content>
            <LoggedInText theme={theme}>Logged in as player</LoggedInText>
            <CodeContainer>
              <CodeText theme={theme}>{code}</CodeText>
              <ProgressBar>
                <Progress progress={progress} />
              </ProgressBar>
            </CodeContainer>
          </Content>
        </GradientOverlay>
      </BackgroundImage>
    </Container>
  );
};

export default AuthCodeDisplay;
