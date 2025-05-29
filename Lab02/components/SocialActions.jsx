import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components/native";

const SocialActions = ({
  likes,
  comments,
  theme,
  onSharePress,
  onLikePress,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    if (typeof onLikePress === "function") onLikePress();
  };

  return (
    <Socials borderColor={theme.borderColor}>
      <SocialsItems>
        <SocialsItem onPress={handleLikePress}>
          <Icon
            name="thumb-up"
            size={24}
            color={isLiked ? theme.iconActiveGreen : theme.iconNonActive}
          />
          <CountText
            color={isLiked ? theme.iconActiveGreen : theme.iconNonActive}
          >
            {likes}
          </CountText>
        </SocialsItem>
        <SocialsItem>
          <Icon name="comment" size={24} color={theme.iconNonActive} />
          <CountText color={theme.iconNonActive}>{comments}</CountText>
        </SocialsItem>
      </SocialsItems>
      <ShareButton onPress={onSharePress}>
        <Icon name="share" size={24} color={theme.iconNonActive} />
      </ShareButton>
    </Socials>
  );
};

const Socials = styled.View`
  border-top-width: 1px;
  border-color: ${(props) => props.borderColor || "#000"};
  width: 100%;
  padding-top: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const SocialsItems = styled.View`
  flex-direction: row;
  gap: 30px;
`;

const SocialsItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const ShareButton = styled.TouchableOpacity`
  padding: 5px;
`;

const CountText = styled.Text`
  color: ${(props) => props.color || "black"};
`;

export default SocialActions;
