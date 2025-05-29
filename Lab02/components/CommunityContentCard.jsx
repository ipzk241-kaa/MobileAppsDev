import React from "react";
import { View, Text, Image } from "react-native";
import { useTheme } from "../config/ThemeContext";
import CardHeader from "./CardHeader";
import SocialActions from "./SocialActions";
import styled from "styled-components/native";

const CommunityContentCard = ({ content }) => {
  const { theme } = useTheme();

  return (
    <CardContainer>
      <CardHeader
        source={content.source}
        published={content.published}
        theme={theme}
      />
      <ContentImage source={content.image.url} />
      <Title color={theme.text1}>{content.title}</Title>
      <Description color={theme.text2}>{content.description}</Description>
      <SocialActions
        likes={content.engagement.likes}
        comments={content.engagement.comments}
        theme={theme}
        onSharePress={() => alert("Shared!")}
      />
    </CardContainer>
  );
};

const CardContainer = styled.View`
  border-radius: 8px;
  margin-vertical: 10px;
  padding: 20px;
  gap: 15px;
`;

const ContentImage = styled.Image`
  width: 100%;
  height: 200px;
  resize-mode: contain;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-family: "ABeeZee-Regular";
  font-size: 16px;
  letter-spacing: -0.32px;
  line-height: 22px;
  color: ${(props) => props.color || "black"};
`;

const Description = styled.Text`
  font-family: "ABeeZee-Regular";
  font-size: 14px;
  letter-spacing: -0.28px;
  line-height: 22px;
  color: ${(props) => props.color || "black"};
`;

export default CommunityContentCard;
